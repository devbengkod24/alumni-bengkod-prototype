function alumniPostAttachment(post) {
  if (post.dashboardAttachment) return post.dashboardAttachment;
  if (post.karya?.nama) {
    return {
      kind: "karya",
      title: post.karya.nama,
      detail: post.karya.tagline,
      link: showcaseWorkLink({ id: post.id })
    };
  }
  if (post.referral?.posisi) {
    return {
      kind: "referral",
      title: post.referral.posisi,
      detail: post.referral.perusahaan,
      link: boardVacancyLink(post.id)
    };
  }
  return null;
}

function formatAlumniPost(post, shown) {
  const timestamp = post.id > 1e12 ? new Date(post.id) : null;
  const presentation = post.dashboardPresentation;
  return {
    timeAgo: timestamp?.toLocaleDateString("id-ID", { dateStyle: "medium" }) || post.date,
    category: post.dashboardAttachment?.kind || post.dashboardCategory || "all",
    tags: [],
    textShort: post.content,
    textFull: post.content,
    mediaImage: post.imageUrl,
    attachment: alumniPostAttachment(post),
    isExpanded: false,
    likesCount: post.likes || 0,
    isLiked: post.isLiked || false,
    commentsCount: post.commentsCount || 0,
    showComments: false,
    newCommentText: "",
    ...presentation,
    comments: [
      ...(presentation?.comments || []),
      ...(post.komentarForum || []).map(comment => ({
        id: comment.id,
        author: comment.penulis,
        avatar: DEFAULT_AVATAR,
        time: new Date(comment.waktu).toLocaleDateString("id-ID"),
        text: comment.isi
      }))
    ],
    ...shown,
    id: post.id,
    authorName: post.authorName,
    authorAvatar: post.authorAvatar || DEFAULT_AVATAR,
    authorHeadline: post.authorHeadline,
    authorId: post.authorId,
    repostedBy: post.repostedBy,
    fromDashboard: post.fromDashboard,
    dashboardPresentation: post.dashboardPresentation,
    pinnedAt: post.pinned_at ? Date.parse(post.pinned_at) || 0 : 0,
    pinnedUntil: post.pinned_until ? Date.parse(post.pinned_until) || 0 : 0,
    pinnedDurationLabel: post.pinned_duration || ""
  };
}

function alumniPostActions() {
  return {
    postMenuId: null,
    reportTargetId: null,
    reportReason: '',
    reportError: '',
    attachmentTypes: {
      karya: { label: 'Karya', category: 'Karya & Showcase', board: 'showcase.html', boardLabel: 'Karya Alumni' },
      gigs: { label: 'Proyek', category: 'Proyek', board: 'gigs.html', boardLabel: 'Proyek' },
      referral: { label: 'Lowongan', category: 'Referral', board: 'referral.html', boardLabel: 'Lowongan' }
    },

    scrollToLinkedPost(card) {
      if (location.hash === "#" + card.id) card.scrollIntoView({ block: "start" });
    },

    toggleLike(post) {
      post.isLiked = !post.isLiked;
      post.likesCount = Math.max(0, post.likesCount + (post.isLiked ? 1 : -1));
      if (post.isLiked) {
        this.setToast('Apresiasi berhasil diberikan (+1 Like)!');
      }
    },

    toggleComments(post) {
      post.showComments = !post.showComments;
    },

    addComment(post) {
      if (!post.newCommentText || !post.newCommentText.trim()) return;
      const newComment = {
        id: Date.now(),
        author: this.userProfile.name,
        avatar: this.userProfile.avatar,
        time: "Baru saja",
        text: post.newCommentText.trim()
      };
      if (!post.comments) post.comments = [];
      post.comments.push(newComment);
      post.commentsCount++;
      post.newCommentText = '';
      this.setToast('Komentar Anda berhasil diposting!');
    },

    openPostReport(post) {
      this.postMenuId = null;
      this.reportTargetId = post.id;
      this.reportReason = '';
      this.reportError = '';
      this.$refs.postReportDialog.showModal();
    },

    submitPostReport() {
      const reason = this.reportReason.trim();
      if (!reason) {
        this.reportError = 'Isi alasan laporan terlebih dahulu.';
        return;
      }

      const result = FeedBersama.lapor({
        id: this.reportTargetId,
        pelapor: this.userProfile.name,
        alasan: reason
      });
      if (!result.ok) {
        this.reportError = result.error;
        return;
      }
      this.$refs.postReportDialog.close();
      this.setToast('Laporan dikirim ke koordinator.');
    },

    setToast(message) {
      this.toast = message;
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => { this.toast = ""; }, 3200);
    },

    isPinnedActive(post) {
      return Boolean(post?.pinnedUntil && post.pinnedUntil > Date.now());
    },

    formatPinnedUntil(post) {
      if (!post?.pinnedUntil) return "";
      return new Date(post.pinnedUntil).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  };
}

function mountAlumniPostCards() {
  document.querySelector("[data-alumni-post-card]").innerHTML = String.raw`<article :id="'post-' + post.id" x-init="$nextTick(() => scrollToLinkedPost($el))"
         :class="isPinnedActive(post) ? 'border-[#B7C8E0] ring-1 ring-[#E2F1F9]' : 'border-[#E3E4E9]'"
         class="scroll-mt-28 bg-white border rounded-[16px] p-5 shadow-sm space-y-4">

  <div x-show="isPinnedActive(post)" x-cloak
       class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E2F1F9] text-[#3A5988] text-[12px] font-semibold">
    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>
    <span x-text="'Disematkan' + (post.pinnedDurationLabel ? ' (' + post.pinnedDurationLabel + ')' : '') + ' · s.d. ' + formatPinnedUntil(post)"></span>
  </div>

  <p x-show="post.repostedBy" x-cloak class="text-[12.5px] text-[#6B7280]"
     x-text="post.repostedBy + ' membagikan ulang postingan ini'"></p>

  <!-- Header Postingan: Avatar, Nama, Posisi, Waktu, Menu Titik Tiga -->
  <div class="flex items-start justify-between gap-3">
    <div class="flex min-w-0 items-center gap-3">
      <img :src="post.authorAvatar" :alt="post.authorName" class="w-11 h-11 rounded-full object-cover shrink-0 border border-[#E3E4E9]">
      <div>
        <h4 class="text-[15px] font-bold text-[#0C1117] leading-tight" x-text="post.authorName"></h4>
        <p class="text-[12.5px] text-[#6B7280] mt-0.5" x-text="[post.authorHeadline, post.timeAgo].filter(Boolean).join(' · ')"></p>
      </div>
    </div>

    <div class="relative shrink-0"
         @click.outside="if (postMenuId === post.id) postMenuId = null"
         @keydown.escape.stop="postMenuId = null; $el.firstElementChild.focus()">
      <button type="button" @click="postMenuId = postMenuId === post.id ? null : post.id"
              :aria-expanded="postMenuId === post.id" :aria-controls="'post-options-' + post.id" aria-label="Opsi postingan"
              class="w-8 h-8 rounded-full hover:bg-[#F4F5F7] text-[#6B7280] flex items-center justify-center transition-colors cursor-pointer">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1.75"/><circle cx="5" cy="12" r="1.75"/><circle cx="19" cy="12" r="1.75"/></svg>
      </button>
      <div :id="'post-options-' + post.id" x-show="postMenuId === post.id" x-cloak
           class="absolute right-0 top-full z-10 mt-1 w-48 rounded-[10px] border border-[#E3E4E9] bg-white p-1 shadow-md">
        <button type="button" @click="openPostReport(post)"
                class="w-full rounded-[6px] px-3 py-2 text-left text-[13px] font-medium text-[#212224] hover:bg-[#F4F5F7]">
          Laporkan postingan
        </button>
        <template x-if="ownsPost(post)">
          <button type="button" @click="deleteOwnPost(post)"
                  class="w-full rounded-[6px] px-3 py-2 text-left text-[13px] font-medium text-red-700 hover:bg-red-50">
            Hapus postingan
          </button>
        </template>
      </div>
    </div>
  </div>

  <div class="text-[14px] text-[#374151] leading-relaxed space-y-1">
    <p x-show="post.textShort" class="whitespace-pre-wrap break-words" x-text="post.isExpanded ? post.textFull : post.textShort"></p>
    <template x-if="post.textFull !== post.textShort">
      <button type="button"
              @click="post.isExpanded = !post.isExpanded"
              class="text-[12.5px] font-bold text-[#3A5988] hover:underline uppercase tracking-wide cursor-pointer pt-0.5">
        <span x-text="post.isExpanded ? 'TUTUP' : 'READ MORE'"></span>
      </button>
    </template>
  </div>

  <template x-if="post.mediaImage">
    <div class="rounded-[14px] overflow-hidden border border-[#E3E4E9] bg-[#E2F1F9] aspect-[16/9] relative group">
      <img :src="post.mediaImage" :alt="post.authorName" class="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300">
    </div>
  </template>

  <template x-if="post.attachment">
    <a :href="post.attachment.link"
       class="block p-4 rounded-[12px] bg-[#F8FAFC] border border-[#E3E4E9] hover:border-[#3A5988]">
      <p class="text-[12px] font-medium text-[#3A5988]" x-text="attachmentTypes[post.attachment.kind].label"></p>
      <h5 class="text-[14.5px] font-bold text-[#0C1117] break-words" x-text="post.attachment.title"></h5>
      <p x-show="post.attachment.detail" class="text-[12.5px] text-[#6B7280] break-words" x-text="post.attachment.detail"></p>
    </a>
  </template>

  <template x-if="post.embedGig">
    <div class="p-4 rounded-[12px] bg-[#F8FAFC] border border-[#E3E4E9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="space-y-1 min-w-0">
        <h5 class="text-[14.5px] font-bold text-[#0C1117]" x-text="post.embedGig.title"></h5>
        <p class="text-[12.5px] text-[#6B7280]" x-text="'Budget: ' + post.embedGig.budget + ' · Durasi: ' + post.embedGig.deadline + ' · Butuh: ' + post.embedGig.role"></p>
      </div>
      <a :href="post.embedGig.link" class="h-9 px-4 rounded-[8px] bg-[#3A5988] hover:bg-[#496DA8] text-white text-[13px] font-medium inline-flex items-center justify-center shrink-0 transition-colors">
        Lihat Proyek
      </a>
    </div>
  </template>

  <template x-if="post.embedReferral">
    <div class="p-4 rounded-[12px] bg-[#F8FAFC] border border-[#E3E4E9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="space-y-1 min-w-0">
        <h5 class="text-[14.5px] font-bold text-[#0C1117]" x-text="post.embedReferral.posisi + ' @ ' + post.embedReferral.perusahaan"></h5>
        <p class="text-[12.5px] text-[#6B7280]" x-text="post.embedReferral.lokasi + ' · ' + post.embedReferral.kuota"></p>
      </div>
      <a :href="post.embedReferral.link" class="h-9 px-4 rounded-[8px] bg-[#3A5988] hover:bg-[#496DA8] text-white text-[13px] font-medium inline-flex items-center justify-center shrink-0 transition-colors">
        Lihat Lowongan
      </a>
    </div>
  </template>

  <div class="space-y-3 pt-2">
    <p x-show="post.likedByNotice" x-cloak class="flex items-center gap-1.5 text-[12.5px] text-[#6B7280]">
      <svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#3A5988]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 10h4v12H2zM22 10c0-1.1-.9-2-2-2h-6l1-4.6.1-.4c0-.4-.2-.8-.5-1.1L13.5 1 7 7.6V22h11c.8 0 1.5-.5 1.8-1.2l2.1-6c.1-.2.1-.5.1-.8z"/>
      </svg>
      <span x-text="post.likedByNotice"></span>
    </p>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-[#6B7280]">

      <!-- Tombol Aksi Kiri: Suka & Komentar -->
      <div class="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">

        <!-- Suka / Like -->
        <button type="button"
                @click="toggleLike(post)"
                class="flex items-center gap-1.5 transition-colors cursor-pointer group"
                :class="post.isLiked ? 'text-[#3A5988] font-bold' : 'hover:text-[#0C1117]'">
          <svg class="w-[18px] h-[18px] group-hover:scale-110 transition-transform" :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          <span x-text="post.isLiked ? 'Disukai' : 'Suka'"></span>
        </button>

        <!-- Komentar -->
        <button type="button"
                @click="toggleComments(post)"
                class="flex items-center gap-1.5 hover:text-[#0C1117] transition-colors cursor-pointer">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Komentar</span>
        </button>
      </div>

      <div class="flex items-center gap-2 text-[12.5px] text-[#6B7280]">
        <span x-text="post.likesCount + ' Suka'"></span>
        <span>·</span>
        <span x-text="post.commentsCount + ' Komentar'"></span>
      </div>

    </div>
  </div>

  <div x-show="post.showComments" x-cloak class="pt-3 space-y-3">

    <!-- Input Komentar Baru -->
    <form @submit.prevent="addComment(post)" class="flex items-center gap-2">
      <img :src="userProfile.avatar" class="w-8 h-8 rounded-full object-cover shrink-0">
      <input type="text"
             x-model="post.newCommentText"
             placeholder="Tulis tanggapan atau masukan untuk rekan..."
             aria-label="Tulis komentar" class="min-w-0 flex-1 h-9 px-3.5 rounded-full bg-[#F4F5F7] focus:bg-white border border-[#E3E4E9] focus:border-[#3A5988] text-[13px] text-[#212224] placeholder-[#91969C] focus:outline-none transition-colors">
      <button type="submit"
              class="h-9 px-4 rounded-full bg-[#3A5988] hover:bg-[#496DA8] text-white text-[12.5px] font-medium transition-colors shrink-0 cursor-pointer">
        Kirim
      </button>
    </form>

    <!-- Daftar Komentar Mengalir Bersih -->
    <div class="space-y-3 pt-2">
      <template x-for="c in post.comments" :key="c.id">
        <div class="flex items-start gap-2.5 text-[13px]">
          <img :src="c.avatar" class="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5">
          <div class="bg-[#F8FAFC] p-3 rounded-[12px] flex-1 space-y-0.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[#0C1117]" x-text="c.author"></span>
              <span class="text-[11px] text-[#91969C]" x-text="c.time"></span>
            </div>
            <p class="break-words text-[#374151]" x-text="c.text"></p>
          </div>
        </div>
      </template>
    </div>

  </div>

</article>`;
  document.querySelector("[data-alumni-post-report]").innerHTML = String.raw`<dialog id="post-report-dialog" x-ref="postReportDialog" aria-labelledby="post-report-title"
          @click.self="$el.close()"
          class="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-[16px] border border-[#E3E4E9] bg-white text-[#212224] shadow-xl">
    <form @submit.prevent="submitPostReport()" class="space-y-4 p-5 sm:p-6">
      <h2 id="post-report-title" class="text-[17px] font-bold text-[#0C1117]">Laporkan Postingan</h2>
      <div class="space-y-2">
        <label for="post-report-reason" class="block text-[13px] font-semibold">Alasan laporan</label>
        <textarea id="post-report-reason" x-model="reportReason" @input="reportError = ''"
                  required autofocus rows="4" placeholder="Jelaskan alasan Anda melaporkan postingan ini."
                  class="w-full resize-y rounded-[10px] border border-[#E3E4E9] px-3 py-2.5 text-[13.5px] outline-none focus:border-[#3A5988]"></textarea>
        <p x-show="reportError" x-text="reportError" role="alert" class="text-[13px] text-red-700"></p>
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" @click="$refs.postReportDialog.close()"
                class="h-10 rounded-[8px] border border-[#E3E4E9] px-4 text-[13px] font-semibold hover:bg-[#F4F5F7]">Batal</button>
        <button type="submit"
                class="h-10 rounded-[8px] bg-[#3A5988] px-4 text-[13px] font-semibold text-white hover:bg-[#496DA8]">Kirim Laporan</button>
      </div>
    </form>
  </dialog>`;
}
