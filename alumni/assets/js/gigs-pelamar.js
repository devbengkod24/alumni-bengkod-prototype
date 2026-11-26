function bengkodGigPelamar() {
  const id = new URLSearchParams(location.search).get("id");
  const profile = alumniProfileForBoard();
  const readProject = () => loadBoardGigs().find(gig => gig.id === id && ownsBoardGig(gig, profile)) || null;
  const badges = {
    pending: { label: "Menunggu Tinjauan", style: "bg-[#FDF0DD] text-[#925512]" },
    accepted: { label: "Diterima", style: "bg-[#E2F1F9] text-[#3A5988]" },
    rejected: { label: "Ditolak", style: "bg-red-100 text-red-700" }
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    gig: readProject(),
    filters: [
      { id: "all", label: "Semua Pelamar" },
      ...Object.entries(badges).map(([id, badge]) => ({ id, label: badge.label }))
    ],
    filter: "all",
    sort: "newest",
    selectedId: null,
    detailOpen: false,
    rejectTarget: null,
    rejectReason: "",
    rejectError: "",
    toast: "",
    toastTimer: null,
    applicantStatus: gigApplicantStatus,

    init() {
      if (this.gig) document.title = "Pelamar: " + this.gig.title + " | Bengkel Koding UDINUS";
      window.addEventListener("pageshow", event => {
        if (event.persisted) this.gig = readProject();
      });
      window.addEventListener("storage", event => {
        if (event.key === GIGS_STORAGE_KEY || event.key === null) this.gig = readProject();
      });
    },

    get applicants() {
      return this.gig?.applicants || [];
    },

    get filteredApplicants() {
      const direction = this.sort === "oldest" ? 1 : -1;
      return this.applicants
        .filter(app => this.filter === "all" || gigApplicantStatus(app) === this.filter)
        .sort((a, b) => direction * (boardDate(a.appliedDate) - boardDate(b.appliedDate)));
    },

    get selectedApplicant() {
      const list = this.filteredApplicants;
      return list.find(app => app.id === this.selectedId) || list[0] || null;
    },

    setFilter(filter) {
      this.filter = filter;
      this.selectedId = null;
      this.detailOpen = false;
    },

    selectApplicant(id) {
      this.selectedId = id;
      this.detailOpen = true;
      this.$nextTick(() => {
        const detail = this.$refs.applicantDetail;
        if (!detail) return;
        detail.scrollTop = 0;
        if (this.$refs.applicantReturn?.getClientRects().length) {
          detail.querySelector("h2")?.focus();
        }
      });
    },

    showApplicantList() {
      this.detailOpen = false;
      this.$nextTick(() => this.$refs.applicantList?.querySelector('[aria-pressed="true"]')?.focus());
    },

    applicantCount(status) {
      if (status === "all") return this.applicants.length;
      return this.applicants.filter(app => gigApplicantStatus(app) === status).length;
    },

    statusBadge(app) {
      return badges[gigApplicantStatus(app)];
    },

    formatDate(value) {
      const date = boardDate(value);
      return date ? new Date(date).toLocaleDateString("id-ID", { dateStyle: "medium" }) : "Belum tersedia";
    },

    emailOf(app) {
      const alumni = findAlumni(app.applicantId) || findAlumni(app.applicantName);
      const email = [app.applicantEmail, alumni?.email].find(value => emailPattern.test(value?.trim() || ""));
      return email?.trim() || "";
    },

    contactLink(app) {
      const email = this.emailOf(app);
      if (!email) return null;
      const address = encodeURIComponent(email).replace("%40", "@");
      const subject = encodeURIComponent("Pengajuan minat proyek " + this.gig.title);
      return "mailto:" + address + "?subject=" + subject;
    },

    canViewCv(app) {
      return Boolean(findAlumni(app.applicantId || app.applicantName));
    },

    portfolioLinks(app) {
      const items = [...(app.portfolioItems || [])];
      if (app.portfolioUrl) items.unshift({ linkUrl: app.portfolioUrl });
      const links = new Map();
      for (const item of items) {
        const url = item.linkUrl?.trim();
        if (!/^https?:\/\//i.test(url || "") || links.has(url)) continue;
        links.set(url, {
          url,
          title: item.title || url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, ""),
          detail: item.stack || ""
        });
      }
      return [...links.values()];
    },

    openReject(app) {
      if (gigApplicantStatus(app) !== "pending") return;
      this.rejectTarget = app;
      this.rejectReason = "";
      this.rejectError = "";
      this.$refs.rejectDialog.showModal();
    },

    submitRejection() {
      const reason = this.rejectReason.trim();
      if (!reason || reason.length > 500) {
        this.rejectError = "Isi alasan penolakan dengan maksimal 500 karakter.";
        return;
      }
      if (this.rejectTarget && this.decide(this.rejectTarget.id, "REJECTED", reason)) {
        this.$refs.rejectDialog.close();
      }
    },

    decide(applicantId, status, reason = "") {
      const gig = readProject();
      const applicant = gig?.applicants?.find(app => app.id === applicantId);
      const notifyError = message => {
        if (status === "REJECTED") this.rejectError = message;
        else this.setToast(message);
      };
      if (!applicant || gigApplicantStatus(applicant) !== "pending") {
        this.gig = gig;
        notifyError("Pengajuan ini sudah berubah. Tutup dan periksa daftar pelamar.");
        return false;
      }
      const decision = { status };
      if (status === "REJECTED") decision.rejectionReason = reason;
      const applicants = gig.applicants.map(app => app.id === applicantId ? { ...app, ...decision } : app);
      if (!saveBoardGig(gig, { applicants })) {
        notifyError("Keputusan gagal disimpan. Coba lagi.");
        return false;
      }
      this.gig = readProject();
      this.setToast(status === "REJECTED" ? "Penolakan dan alasannya disimpan." : "Pengajuan diterima.");
      return true;
    },

    setToast(message) {
      this.toast = message;
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => { this.toast = ""; }, 4000);
    }
  };
}

document.addEventListener("alpine:init", () => {
  Alpine.data("bengkodGigPelamar", bengkodGigPelamar);
});
