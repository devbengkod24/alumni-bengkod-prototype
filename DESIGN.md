# DESIGN SYSTEM SPECIFICATION: PORTAL ALUMNI BENGKEL KODING

> **Referensi Utama:** Diekstrak langsung dari `lms-bengkod-web` (`tailwind.config.ts`, `globals.css`, komponen UI core).  
> **Status:** 100% Konsistensi Visual dengan LMS Bengkel Koding UDINUS.

---

## 1. Tipografi (Typography)

Sistem tipografi menggunakan font **Poppins** (Google Fonts) sebagai font utama untuk seluruh antarmuka aplikasi.

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  color: #46494E; /* neutral1 */
  background-color: #F4F4F4; /* neutral5 */
}
```

### Skala Tipografi Baku (Desktop & Mobile)
| Elemen | Desktop Size | Weight | Line Height | Mobile Size (<600px) |
|---|---|---|---|---|
| `h1` | 42px | 600 (Semibold) | 1.2 | 39px |
| `h2` | 32px | 500 (Medium) | 1.25 | 24px |
| `h3` | 18px | 500 (Medium) | 1.3 | 17px |
| `p` | 16px | 400 (Regular) | 1.6 | 15px |
| `label` | 16px | 500 (Medium) | 1.4 | 15px |
| `caption` | 12px | 400 (Regular) | 1.4 | 11px |
| `text-xs` | 12px | 400/500/600 | 1.4 | 11px |
| `text-sm` | 14px | 400/500/600 | 1.5 | 13px |

---

## 2. Palet Warna (Color Palette)

Palet warna menggunakan format penamaan resmi token `lms-bengkod-web`.

### A. Warna Utama (Primary Brand)
| Token | Hex Code | Karakteristik & Penggunaan |
|---|---|---|
| `primary1` | `#1E3A8A` | **Deep Blue / Navy.** Warna tombol primer, header sidebar aktif, navbar brand |
| `primary2` | `#1D4ED8` | **Royal Blue.** Hover state tombol primer, gradien aksen |
| `primary3` | `#3B82F6` | **Bright Blue.** Aksen fokus, link interaktif, indikator aktif |
| `primary4` | `#93C5FD` | **Soft Blue.** Border aksen halus, chip sekunder |
| `primary5` | `#DBEAFE` | **Light Blue Tint.** Background hover menu sidebar, focus ring form |

### B. Warna Aksen & Sekunder (Secondary & Gold)
| Token | Hex Code | Karakteristik & Penggunaan |
|---|---|---|
| `secondary1` | `#FFC150` | **Warm Gold.** Tombol sekunder, lencana prestasi, rating bintang |
| `secondary2` | `#FFCD73` | **Medium Gold.** Hover tombol sekunder |
| `secondary3` | `#FFE0A8` | **Light Gold.** Focus ring elemen sekunder |
| `secondary4` | `#DEDFE1` | **Muted Gold/Gray.** Border netral |

### C. Warna Netral (Neutrals)
| Token | Hex Code | Karakteristik & Penggunaan |
|---|---|---|
| `neutral1` | `#46494E` | **Dark Charcoal.** Teks judul utama, teks isi, teks tabel |
| `neutral2` | `#55585E` | **Medium Gray.** Teks label form, subtitle, teks bantuan |
| `neutral3` | `#6B6E76` | **Muted Gray.** Placeholder input, teks disabled |
| `neutral4` | `#DEDFE1` | **Border Gray.** Garis batas card, divider sidebar, border input |
| `neutral5` | `#F4F4F4` | **Off-White Gray.** Background dashboard, area kanvas kerja |
| `neutral6` | `#FFFFFF` | **Pure White.** Background card, sidebar, modal, input |

### D. Warna Semantik (Feedback & Status)
| Status | Token & Hex | Penggunaan |
|---|---|---|
| **Success** | `green1: #1C6A1A`, `green2: #068913`, `green3: #CDFECF` | Badge Aktif, Verifikasi Disetujui, Notifikasi Sukses |
| **Danger** | `red1: #B00B0B`, `red2: #D73D3D`, `red3: #FCC6CD` | Badge Ditolak, Nonaktifkan Akun, Pesan Error Form |
| **Warning** | `yellow1: #8F6F00`, `yellow2: #FFCE22`, `yellow3: #FFECAA` | Badge Menunggu Persetujuan / Draft, Peringatan |
| **Info/Blue**| `blue1: #002C9D`, `blue2: #2E63EA`, `blue3: #B0C6FF` | Informasi umum, pengumuman, tag kategori |

---

## 3. Sistem Elevasi & Shadow (Elevations)

Diekstrak langsung dari utility `.elevation` pada `globals.css`:

```css
.elevation1 { box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); }
.elevation2 { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.elevation3 { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
.elevation4 { box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); }
.elevation5 { box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1); }
```

---

## 4. Standar Komponen UI (Component Standards)

### A. Tombol (Buttons)
- **Primary Button:**
  `px-5 py-2.5 font-medium rounded-lg text-white bg-primary1 hover:bg-primary2 focus:ring-4 focus:ring-primary5 transition-all duration-200`
- **Secondary Button:**
  `px-5 py-2.5 font-medium rounded-lg text-white bg-secondary1 hover:bg-secondary2 focus:ring-4 focus:ring-secondary3 transition-all duration-200`
- **Tertiary / Outline Button:**
  `px-5 py-2.5 font-medium rounded-lg text-neutral1 bg-white hover:bg-neutral5 border border-neutral4 focus:ring-4 focus:ring-neutral5 transition-all duration-200`
- **Danger Button:**
  `px-5 py-2.5 font-medium rounded-lg text-white bg-red2 hover:bg-red1 focus:ring-4 focus:ring-red3 transition-all duration-200`

### B. Input Formulir (Form Controls)
- **Label:**
  `block text-sm font-medium text-neutral2 mb-1.5`
- **Input Field:**
  `block w-full px-3.5 py-2.5 border border-neutral4 rounded-md text-neutral1 bg-white placeholder-neutral3 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 text-sm transition-all duration-150`
- **Input Error State:**
  `border-red1 focus:ring-red3 focus:border-red1`
- **Helper/Error Text:**
  `text-xs text-red2 mt-1 font-normal`

### C. Sidebar Dashboard (Admin / Koordinator / Mitra / SuperAdmin)
- **Sidebar Container:**
  `fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 z-30 flex flex-col`
- **Logo Area:**
  `flex items-center justify-center py-6 px-4 border-b border-neutral4`
- **Menu Item (Default):**
  `flex items-center w-full p-2.5 text-neutral1 rounded-lg hover:bg-primary5 hover:text-primary1 transition-all duration-150 text-sm font-medium`
- **Menu Item (Aktif):**
  `flex items-center w-full p-2.5 text-white bg-primary1 rounded-lg text-sm font-medium shadow-sm`
- **Divider:**
  `w-full h-0.5 my-3 bg-neutral4`
- **Logout Action:**
  `hover:bg-red3 hover:text-red1 text-neutral2`

### D. Kartu Konten (Cards)
- **Dashboard Card:**
  `bg-white rounded-xl border border-neutral4 p-6 elevation2`
- **Stat Widget:**
  `bg-white rounded-xl border border-neutral4 p-5 elevation1 flex items-center justify-between`

### E. Tabel Data (Tables)
- **Header:**
  `bg-neutral5 text-neutral2 text-xs font-semibold uppercase tracking-wider py-3.5 px-4 text-left border-b border-neutral4`
- **Row:**
  `border-b border-neutral4 hover:bg-blue-50/40 text-sm text-neutral1 transition-colors`
- **Cell:**
  `py-3.5 px-4`

### F. Status Badges
- **Aktif / Disetujui:**
  `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green3 text-green1 border border-green2/30`
- **Menunggu / Draft:**
  `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow3 text-yellow1 border border-yellow2/30`
- **Ditolak / Nonaktif:**
  `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red3 text-red1 border border-red2/30`
- **Kategori / Netral:**
  `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary5 text-primary1 border border-primary4/50`

---

## 5. Struktur Folder Aplikasi

Aplikasi diorganisir secara modular berdasarkan peran pengguna:

```text
root/
├── DESIGN.md
├── index.html                         # Landing Page Utama
├── assets/                            # Shared Global Assets
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
├── alumni/                            # Role: Alumni
│   ├── register.html
│   ├── status-karir.html
│   ├── dashboard.html
│   └── assets/
│       └── js/alumni.js
├── koordinator/                       # Role: Koordinator Alumni (8 menu sidebar)
│   ├── dashboard.html                 # Ringkasan + log audit aksi sensitif
│   ├── analitik.html                  # Tracer study & masa tunggu (Chart.js)
│   ├── rekap-tahunan.html             # Rekap per tahun lulus + ekspor CSV
│   ├── pengumuman.html
│   ├── manajemen-users.html           # Hanya role alumni & mitra yang bisa dikelola
│   ├── forum.html                     # Moderasi laporan & thread
│   ├── tracer-data.html               # Verifikasi data alumni & mitra
│   ├── lowongan.html                  # Pengajuan (setujui/tolak), semua, kelola
│   └── assets/
│       └── js/koordinator.js          # Sidebar, data dummy, helper bersama
├── mitra/                             # Role: Mitra Perusahaan
│   ├── dashboard.html
│   ├── lengkapi-profil.html
│   ├── lowongan-kelola.html
│   ├── data-alumni.html
│   └── assets/
│       └── js/mitra.js
└── superadmin/                        # Role: SuperAdmin
    ├── koordinator.html
    └── assets/
        └── js/superadmin.js
```

---

## 6. Standar Git & Branching Strategy (Wajib Dipatuhi)

Untuk menjaga kerapian repositori dan kolaborasi tim yang terkontrol, push ke GitHub diatur dengan aturan ketat:

### A. Hirarki Branch
1. **`main`**: Branch produksi / rilis stabil. **DILARANG push langsung ke main**.
2. **`development`**: Branch integrasi utama seluruh fitur dalam tahap pengembangan.
3. **`feature/*` / `feat/*`**: Branch kerja untuk setiap fitur atau perbaikan.

### B. Aturan Push Per-Branch (Wajib Branch Baru untuk Tiap Fitur)
- **Setiap pengerjaan fitur baru WAJIB dibuat di branch baru** yang dicabangkan dari branch `development`.
- Contoh konvensi penamaan branch:
  - `feat/landing-page` : Pengerjaan UI Landing Page publik.
  - `feat/alumni-register` : Pengerjaan UI Formulir Registrasi Alumni.
  - `feat/alumni-status-karir` : Pengerjaan UI Formulir Status Karir Alumni.
  - `feat/koordinator-dashboard` : Pengerjaan Dashboard Koordinator.
  - `feat/koordinator-review-lowongan` : Pengerjaan Moderasi Lowongan Mitra.
  - `feat/mitra-lengkapi-profil` : Pengerjaan Form Profil Perusahaan Mitra.
  - `feat/mitra-lowongan` : Pengerjaan Form Pasang & Kelola Lowongan.
  - `feat/superadmin-koordinator` : Pengerjaan Menu Manajemen Koordinator SuperAdmin.

### C. Alur Kerja (Workflow)
1. Pindah ke branch `development`: `git checkout development`
2. Tarik update terbaru: `git pull origin development`
3. Buat branch fitur baru: `git checkout -b feat/<nama-fitur>`
4. Lakukan pengerjaan kode & commit bertahap dengan pesan yang jelas.
5. Push branch fitur ke remote GitHub: `git push -u origin feat/<nama-fitur>`
6. Buat Pull Request (PR) ke branch `development` untuk direview sebelum digabungkan.

