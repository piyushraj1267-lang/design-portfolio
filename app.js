// Main Portfolio Application State & Storage Engine (IndexedDB + LocalStorage)

class DesignStorage {
  constructor(dbName = "DesignPortfolioDB", storeName = "designs") {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
    this.legacyKey = "engineering_design_portfolio_v2";
  }

  async init() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn("IndexedDB not supported, falling back to localStorage.");
        resolve(false);
        return;
      }
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
        }
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(true);
      };
      request.onerror = (e) => {
        console.warn("IndexedDB open failed, using localStorage fallback:", e);
        resolve(false);
      };
    });
  }

  async getAll() {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => {
          if (req.result && req.result.length > 0) {
            resolve(req.result);
          } else {
            // Check legacy localStorage fallback
            const legacy = localStorage.getItem(this.legacyKey);
            if (legacy) {
              try { resolve(JSON.parse(legacy)); return; } catch(e){}
            }
            resolve(null);
          }
        };
        req.onerror = () => resolve(this.getLocalStorageFallback());
      });
    }
    return this.getLocalStorageFallback();
  }

  async saveAll(designs) {
    // Always sync memory state to IndexedDB
    if (this.db) {
      try {
        const tx = this.db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        store.clear();
        designs.forEach(d => store.put(d));
      } catch (e) {
        console.warn("IndexedDB write failed:", e);
      }
    }
    // Attempt localStorage backup for smaller datasets
    try {
      localStorage.setItem(this.legacyKey, JSON.stringify(designs));
    } catch (e) {
      // Quota error ignored because IndexedDB safely persists all data!
    }
  }

  getLocalStorageFallback() {
    try {
      const saved = localStorage.getItem(this.legacyKey);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }
}

class DesignPortfolioApp {
  constructor() {
    this.storage = new DesignStorage();
    this.designs = [];
    this.currentCategory = "All";
    this.searchQuery = "";
    this.sortBy = "newest";
    this.activeModalDesign = null;
    this.uploadedImagesTemp = [];
    this.editingId = null;
    this.isProcessingImages = false;

    this.init();
  }

  async init() {
    await this.storage.init();
    await this.loadDesigns();
    this.bindEvents();
    this.renderCategoryCounts();
    this.renderGrid();
  }

  async loadDesigns() {
    const data = await this.storage.getAll();
    if (data && data.length > 0) {
      this.designs = data;
    } else {
      this.designs = Array.from(SAMPLE_DESIGNS);
      await this.storage.saveAll(this.designs);
    }
  }

  async saveToStorage() {
    await this.storage.saveAll(this.designs);
  }

  // Render Grid with filtering & sorting
  renderGrid(highlightId = null) {
    const container = document.getElementById("designs-grid");
    const emptyState = document.getElementById("empty-state");
    const countLabel = document.getElementById("results-count");

    if (!container) return;

    // Filter logic
    let filtered = this.designs.filter(design => {
      const matchCat = this.currentCategory === "All" || design.category === this.currentCategory;
      
      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        (design.title && design.title.toLowerCase().includes(q)) ||
        (design.category && design.category.toLowerCase().includes(q)) ||
        (design.shortDescription && design.shortDescription.toLowerCase().includes(q)) ||
        (design.fullDescription && design.fullDescription.toLowerCase().includes(q)) ||
        (design.software && design.software.some(s => s.toLowerCase().includes(q))) ||
        (design.specs && design.specs.some(sp => sp.key.toLowerCase().includes(q) || sp.value.toLowerCase().includes(q)));

      return matchCat && matchSearch;
    });

    // Sort logic
    filtered.sort((a, b) => {
      if (this.sortBy === "newest") return new Date(b.date || 0) - new Date(a.date || 0);
      if (this.sortBy === "oldest") return new Date(a.date || 0) - new Date(b.date || 0);
      if (this.sortBy === "title-az") return (a.title || "").localeCompare(b.title || "");
      return 0;
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} of ${this.designs.length} designs`;
    }

    if (filtered.length === 0) {
      container.classList.add("hidden");
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    container.classList.remove("hidden");

    container.innerHTML = filtered.map(design => this.createCardHTML(design, design.id === highlightId)).join("");

    if (window.lucide) window.lucide.createIcons();

    if (highlightId) {
      setTimeout(() => {
        const el = document.getElementById(`card-${highlightId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  createCardHTML(design, isHighlighted = false) {
    const primaryImg = design.images && design.images.length > 0 
      ? design.images[0] 
      : `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="100%" height="100%" fill="%231e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="monospace">NO IMAGE</text></svg>`;

    const imgCountBadge = design.images && design.images.length > 1 
      ? `<span class="absolute top-3 right-3 bg-slate-900/90 text-cyan-400 text-xs px-2.5 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1 font-mono backdrop-blur-md">
          <i data-lucide="layers" class="w-3.5 h-3.5"></i> ${design.images.length} Views
         </span>` 
      : "";

    const softwareBadges = (design.software || []).map(sw => 
      `<span class="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded border border-slate-700 font-mono">${this.escapeHTML(sw)}</span>`
    ).join("");

    const dateFormatted = design.date ? new Date(design.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A';
    const highlightClass = isHighlighted ? 'ring-2 ring-cyan-400 shadow-xl shadow-cyan-500/20' : '';

    return `
      <div id="card-${design.id}" class="glass-panel rounded-xl overflow-hidden flex flex-col justify-between group ${highlightClass}">
        <div>
          <!-- Image Header -->
          <div class="card-img-wrapper h-52 bg-slate-950 flex items-center justify-center relative cursor-pointer" onclick="app.openDetailModal('${design.id}')">
            <img src="${primaryImg}" alt="${this.escapeHTML(design.title)}" class="w-full h-full object-cover" loading="lazy" />
            ${imgCountBadge}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            <span class="absolute bottom-3 left-3 bg-cyan-950/80 text-cyan-300 text-xs px-2.5 py-1 rounded border border-cyan-800 font-mono">
              ${this.escapeHTML(design.category)}
            </span>
          </div>

          <!-- Content Body -->
          <div class="p-5">
            <div class="flex items-center justify-between gap-2 mb-2 text-xs text-slate-400 font-mono">
              <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5 text-cyan-400"></i> ${dateFormatted}</span>
              <span class="text-slate-500">ID: ${design.id}</span>
            </div>

            <h3 class="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2 cursor-pointer" onclick="app.openDetailModal('${design.id}')">
              ${this.escapeHTML(design.title)}
            </h3>

            <p class="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
              ${this.escapeHTML(design.shortDescription)}
            </p>

            <!-- Software Tools List -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${softwareBadges}
            </div>
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between">
          <button onclick="app.openDetailModal('${design.id}')" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 py-1">
            <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> Inspect Model
          </button>
          
          <div class="flex items-center gap-2">
            <button onclick="app.openEditModal('${design.id}')" title="Edit Design" class="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="app.deleteDesign('${design.id}')" title="Delete Design" class="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderCategoryCounts() {
    const categories = ["All", "CAD Design", "Tractor & Farm Machinery", "Drone Design", "Engineering Projects", "Other Designs"];
    
    categories.forEach(cat => {
      const cleanId = `count-${cat.replace(/[^a-zA-Z]/g, "")}`;
      const countEl = document.getElementById(cleanId);
      if (countEl) {
        const count = cat === "All" ? this.designs.length : this.designs.filter(d => d.category === cat).length;
        countEl.textContent = `(${count})`;
      }
    });
  }

  // Bind UI Events
  bindEvents() {
    // Category Filter Pills
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        const target = e.currentTarget;
        target.classList.add("active");
        this.currentCategory = target.getAttribute("data-category");
        this.renderGrid();
      });
    });

    // Search Input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderGrid();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.renderGrid();
      });
    }

    // Image Upload Drag & Drop & Input
    const dropzone = document.getElementById("image-dropzone");
    const fileInput = document.getElementById("file-input");

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());
      
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });

      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
      });

      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) {
          this.handleFileSelect(e.dataTransfer.files);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
          this.handleFileSelect(e.target.files);
        }
      });
    }

    // Add Image URL button
    const addUrlBtn = document.getElementById("add-url-btn");
    const urlInput = document.getElementById("image-url-input");
    if (addUrlBtn && urlInput) {
      addUrlBtn.addEventListener("click", () => {
        const val = urlInput.value.trim();
        if (val) {
          this.uploadedImagesTemp.push(val);
          urlInput.value = "";
          this.renderModalImagePreviews();
        }
      });
    }

    // Add Spec Row Button
    const addSpecBtn = document.getElementById("add-spec-btn");
    if (addSpecBtn) {
      addSpecBtn.addEventListener("click", () => this.addSpecRow());
    }

    // Modal Form Submit
    const designForm = document.getElementById("design-form");
    if (designForm) {
      designForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveDesignFromModal();
      });
    }
  }

  // Handle uploaded files via FileReader with canvas image compression
  handleFileSelect(files) {
    const validFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) return;

    this.isProcessingImages = true;
    this.updateUploadStatus("Processing & compressing images...");

    let processedCount = 0;

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Compress image to max 1000px width/height
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1000;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // 0.75 Quality JPEG balances crisp technical detail with small file footprint (~90KB)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
          this.uploadedImagesTemp.push(compressedDataUrl);

          processedCount++;
          if (processedCount === validFiles.length) {
            this.isProcessingImages = false;
            this.updateUploadStatus("");
            this.renderModalImagePreviews();
            this.showToast(`Added ${validFiles.length} image(s).`, "success");
          }
        };
        img.onerror = () => {
          processedCount++;
          if (processedCount === validFiles.length) {
            this.isProcessingImages = false;
            this.updateUploadStatus("");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  updateUploadStatus(msg) {
    const statusEl = document.getElementById("upload-status-msg");
    if (statusEl) {
      statusEl.textContent = msg;
      if (msg) statusEl.classList.remove("hidden");
      else statusEl.classList.add("hidden");
    }
  }

  renderModalImagePreviews() {
    const previewContainer = document.getElementById("image-preview-container");
    if (!previewContainer) return;

    if (this.uploadedImagesTemp.length === 0) {
      previewContainer.innerHTML = `<p class="text-xs text-slate-500 italic py-2 col-span-4">No custom images uploaded yet (default SVG preview will be generated).</p>`;
      return;
    }

    previewContainer.innerHTML = this.uploadedImagesTemp.map((img, idx) => `
      <div class="relative group border border-slate-700 rounded-lg overflow-hidden h-20 bg-slate-900">
        <img src="${img}" class="w-full h-full object-cover" />
        <button type="button" onclick="app.removeModalImage(${idx})" class="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-1 hover:bg-red-500 transition-colors">
          <i data-lucide="x" class="w-3 h-3"></i>
        </button>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  removeModalImage(index) {
    this.uploadedImagesTemp.splice(index, 1);
    this.renderModalImagePreviews();
  }

  // Dynamic Specs Table inside Add/Edit Form
  addSpecRow(key = "", value = "") {
    const container = document.getElementById("specs-form-rows");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "flex items-center gap-2 spec-row";
    row.innerHTML = `
      <input type="text" placeholder="Spec Name (e.g. Torque)" value="${this.escapeHTML(key)}" class="spec-key bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 w-1/2 focus:border-cyan-400 focus:outline-none" />
      <input type="text" placeholder="Value (e.g. 450 Nm)" value="${this.escapeHTML(value)}" class="spec-val bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 w-1/2 focus:border-cyan-400 focus:outline-none" />
      <button type="button" onclick="this.parentElement.remove()" class="text-slate-500 hover:text-red-400 p-1">
        <i data-lucide="minus-circle" class="w-4 h-4"></i>
      </button>
    `;
    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
  }

  // Open Add Design Modal
  openAddModal() {
    this.editingId = null;
    this.uploadedImagesTemp = [];
    
    const modalTitle = document.getElementById("modal-title");
    if (modalTitle) modalTitle.textContent = "Add New Design";

    const form = document.getElementById("design-form");
    if (form) form.reset();

    const dateInput = document.getElementById("design-date");
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];

    const specsRows = document.getElementById("specs-form-rows");
    if (specsRows) {
      specsRows.innerHTML = "";
      this.addSpecRow("Material", "");
      this.addSpecRow("Dimensions", "");
    }

    this.renderModalImagePreviews();

    const modal = document.getElementById("design-modal");
    if (modal) {
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "true");
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Open Edit Design Modal
  openEditModal(id) {
    const design = this.designs.find(d => d.id === id);
    if (!design) return;

    this.editingId = id;
    this.uploadedImagesTemp = [...(design.images || [])];

    document.getElementById("modal-title").textContent = "Edit Design";
    document.getElementById("design-title-input").value = design.title || "";
    document.getElementById("design-category-select").value = design.category || "CAD Design";
    document.getElementById("design-software-input").value = (design.software || []).join(", ");
    document.getElementById("design-date").value = design.date || new Date().toISOString().split("T")[0];
    document.getElementById("design-short-desc").value = design.shortDescription || "";
    document.getElementById("design-full-desc").value = design.fullDescription || "";

    const specsContainer = document.getElementById("specs-form-rows");
    specsContainer.innerHTML = "";
    if (design.specs && design.specs.length > 0) {
      design.specs.forEach(sp => this.addSpecRow(sp.key, sp.value));
    } else {
      this.addSpecRow();
    }

    this.renderModalImagePreviews();

    const modal = document.getElementById("design-modal");
    if (modal) {
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "true");
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  closeModal() {
    const modal = document.getElementById("design-modal");
    if (modal) {
      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
      }
    }
  }

  // Save Design from Modal Form
  async saveDesignFromModal() {
    if (this.isProcessingImages) {
      this.showToast("Please wait for image uploads to complete.", "danger");
      return;
    }

    const titleInput = document.getElementById("design-title-input");
    const categorySelect = document.getElementById("design-category-select");
    const softwareInput = document.getElementById("design-software-input");
    const dateInput = document.getElementById("design-date");
    const shortDescInput = document.getElementById("design-short-desc");
    const fullDescInput = document.getElementById("design-full-desc");

    const title = titleInput ? titleInput.value.trim() : "";
    const category = categorySelect ? categorySelect.value : "CAD Design";
    const softwareRaw = softwareInput ? softwareInput.value.trim() : "";
    const date = dateInput ? dateInput.value : new Date().toISOString().split("T")[0];
    const shortDesc = shortDescInput ? shortDescInput.value.trim() : "";
    const fullDesc = fullDescInput ? fullDescInput.value.trim() : "";

    if (!title) {
      this.showToast("Please enter a Design Title.", "danger");
      if (titleInput) titleInput.focus();
      return;
    }

    if (!shortDesc) {
      this.showToast("Please enter a Short Description.", "danger");
      if (shortDescInput) shortDescInput.focus();
      return;
    }

    const software = softwareRaw 
      ? softwareRaw.split(",").map(s => s.trim()).filter(Boolean) 
      : ["SolidWorks"];
    
    // Collect Specs
    const specRows = document.querySelectorAll("#specs-form-rows .spec-row");
    const specs = [];
    specRows.forEach(row => {
      const k = row.querySelector(".spec-key").value.trim();
      const v = row.querySelector(".spec-val").value.trim();
      if (k && v) specs.push({ key: k, value: v });
    });

    const newId = this.editingId || `dsg-${Date.now()}`;
    const newDesign = {
      id: newId,
      title,
      category,
      software,
      date: date || new Date().toISOString().split("T")[0],
      shortDescription: shortDesc,
      fullDescription: fullDesc || shortDesc,
      specs,
      images: this.uploadedImagesTemp.length > 0 ? [...this.uploadedImagesTemp] : [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2338bdf8" font-family="monospace" font-size="20">${encodeURIComponent(title)}</text></svg>`
      ]
    };

    if (this.editingId) {
      const idx = this.designs.findIndex(d => d.id === this.editingId);
      if (idx !== -1) this.designs[idx] = newDesign;
      this.showToast("Design updated successfully!", "success");
    } else {
      this.designs.unshift(newDesign);
      this.showToast("🎉 New design published to portfolio!", "success");
    }

    await this.saveToStorage();

    // Reset current filter to All so new design is immediately visible
    this.currentCategory = "All";
    document.querySelectorAll(".filter-btn").forEach(b => {
      if (b.getAttribute("data-category") === "All") b.classList.add("active");
      else b.classList.remove("active");
    });

    this.renderCategoryCounts();
    this.renderGrid(newId);
    this.closeModal();

    if (window.lucide) window.lucide.createIcons();
  }

  // Delete Design
  async deleteDesign(id) {
    const design = this.designs.find(d => d.id === id);
    if (!design) return;

    if (confirm(`Are you sure you want to delete "${design.title}"?`)) {
      this.designs = this.designs.filter(d => d.id !== id);
      await this.saveToStorage();
      this.renderCategoryCounts();
      this.renderGrid();
      this.showToast("Design removed.", "success");
      
      const detailModal = document.getElementById("detail-modal");
      if (detailModal && detailModal.open) detailModal.close();
    }
  }

  // Open Detail View Modal with Image Gallery Carousel
  openDetailModal(id) {
    const design = this.designs.find(d => d.id === id);
    if (!design) return;

    this.activeModalDesign = design;

    document.getElementById("detail-title").textContent = design.title;
    document.getElementById("detail-category").textContent = design.category;
    document.getElementById("detail-date").textContent = design.date ? new Date(design.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    document.getElementById("detail-id").textContent = design.id;
    document.getElementById("detail-short-desc").textContent = design.shortDescription;
    document.getElementById("detail-full-desc").textContent = design.fullDescription || design.shortDescription;

    // Software Pills
    const swContainer = document.getElementById("detail-software-list");
    swContainer.innerHTML = (design.software || []).map(sw => 
      `<span class="bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs px-2.5 py-1 rounded">${this.escapeHTML(sw)}</span>`
    ).join("");

    // Specs Table
    const specsContainer = document.getElementById("detail-specs-table");
    if (design.specs && design.specs.length > 0) {
      specsContainer.innerHTML = design.specs.map(sp => `
        <tr class="border-b border-slate-800">
          <td class="py-2 px-3 text-slate-400 font-mono text-xs font-semibold">${this.escapeHTML(sp.key)}</td>
          <td class="py-2 px-3 text-slate-200 text-xs font-mono">${this.escapeHTML(sp.value)}</td>
        </tr>
      `).join("");
    } else {
      specsContainer.innerHTML = `<tr><td colspan="2" class="py-2 px-3 text-slate-500 text-xs italic">No technical specs recorded.</td></tr>`;
    }

    // Images Carousel setup
    const mainImg = document.getElementById("carousel-main-img");
    const thumbsContainer = document.getElementById("carousel-thumbs");
    const images = design.images && design.images.length > 0 ? design.images : [];

    if (images.length > 0) {
      mainImg.src = images[0];
      
      thumbsContainer.innerHTML = images.map((img, idx) => `
        <img src="${img}" onclick="app.selectCarouselImage(${idx})" class="carousel-thumb w-16 h-12 object-cover rounded bg-slate-900 ${idx === 0 ? 'active' : 'opacity-60'}" />
      `).join("");
    } else {
      mainImg.src = "";
      thumbsContainer.innerHTML = "";
    }

    // Action Buttons
    document.getElementById("detail-edit-btn").onclick = () => {
      document.getElementById("detail-modal").close();
      this.openEditModal(design.id);
    };

    document.getElementById("detail-delete-btn").onclick = () => {
      this.deleteDesign(design.id);
    };

    const detailModal = document.getElementById("detail-modal");
    if (detailModal) {
      if (typeof detailModal.showModal === "function") {
        detailModal.showModal();
      } else {
        detailModal.setAttribute("open", "true");
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  selectCarouselImage(index) {
    if (!this.activeModalDesign || !this.activeModalDesign.images) return;
    
    const mainImg = document.getElementById("carousel-main-img");
    mainImg.src = this.activeModalDesign.images[index];

    const thumbs = document.querySelectorAll(".carousel-thumb");
    thumbs.forEach((t, i) => {
      if (i === index) {
        t.classList.add("active");
        t.classList.remove("opacity-60");
      } else {
        t.classList.remove("active");
        t.classList.add("opacity-60");
      }
    });
  }

  closeDetailModal() {
    const detailModal = document.getElementById("detail-modal");
    if (detailModal) {
      if (typeof detailModal.close === "function") detailModal.close();
      else detailModal.removeAttribute("open");
    }
  }

  // Backup & Restore JSON functionality
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.designs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast("Portfolio backup exported!", "success");
  }

  async importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          this.designs = imported;
          await this.saveToStorage();
          this.renderCategoryCounts();
          this.renderGrid();
          this.showToast(`Imported ${imported.length} designs successfully!`, "success");
        } else {
          this.showToast("Invalid JSON structure.", "danger");
        }
      } catch (err) {
        this.showToast("Failed to parse JSON file.", "danger");
      }
    };
    reader.readAsText(file);
  }

  async resetToDefaults() {
    if (confirm("Reset all portfolio items to initial sample designs? This will clear custom changes.")) {
      this.designs = Array.from(SAMPLE_DESIGNS);
      await this.saveToStorage();
      this.renderCategoryCounts();
      this.renderGrid();
      this.showToast("Portfolio reset to default sample models.", "success");
    }
  }

  // Helpers
  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const icon = type === "success" ? "check-circle" : "alert-circle";
    toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i> <span>${this.escapeHTML(message)}</span>`;
    
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Global App Instance
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new DesignPortfolioApp();
  if (window.lucide) window.lucide.createIcons();
});
