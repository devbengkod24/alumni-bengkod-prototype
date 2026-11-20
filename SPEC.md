# Spesifikasi Arsitektur & Inventaris Fitur Portal Alumni Bengkel Koding
**Versi:** 2.1 (Brainstorming & Reposisi Sistem)  
**Status:** Draf Perencanaan  
**Prinsip Utama:** Peer-to-Peer (P2P) Horizontal, 100% Eksklusif Sesama Alumni Asisten Lab Bengkel Koding (Tanpa Mitra, Tanpa Hierarki Senior/Junior, Tanpa Mahasiswa Aktif).

---

## 1. Ringkasan Eksekutif & Reposisi Paradigma

Portal Alumni Bengkel Koding direposisi dari bursa kerja (*job board*) konvensional menjadi **ekosistem kolaborasi teknologi, pertukaran proyek freelance, pengujian produk, dan pelacakan karir terintegrasi (*tracer study*)**.

### Prinsip Fondasi:
1. **P2P Setara (Horizontal):** Seluruh interaksi terjadi murni antar-rekan alumni purna tugas asisten lab. Tidak ada hierarki senior vs junior, dan tidak melibatkan adik tingkat / mahasiswa aktif.
2. **Eliminasi Peran Mitra 100%:** Seluruh modul, pendaftaran akun, dan alur perusahaan/mitra dihapus total.
3. **Embedded Tracer Study:** Menu survei kaku di sidebar ditiadakan; data tracer dikumpulkan secara progresif melalui *first-login onboarding* dan tersimpan di `Profil Saya`.
4. **Bebas Beban Finansial & Legal:** Sistem tidak memproses transaksi uang, escrow, rekening, maupun bukti transfer (menggunakan model *Transparent Range*).

---

## 2. Inventaris Fitur Berdasarkan Role

### A. Role: Alumni (Aktor Utama Komunitas)

| No | Modul | Fitur | Deskripsi Fungsional |
| :--- | :--- | :--- | :--- |
| 1 | **Onboarding** | Wizard First-Login | Modal pengisian status karir perdana (pekerjaan utama, freelance, studi S2, domisili) saat pertama kali masuk. |
| 2 | **Beranda** | Linimasa Interaktif (Feed) | Feed aktivitas komunitas: posting diskusi teknis, pembaruan karir, dan pengumuman. |
| 3 | **Beranda** | Carousel Spotlight | Menampilkan produk alumni terbaik hasil kurasi bulanan Koordinator. |
| 4 | **Beranda** | Widget Gigs & Beta Test | Menampilkan proyek gigs yang masih `OPEN` dan produk yang membutuhkan tester. |
| 5 | **Alumni** | Direktori Rekan Alumni | Pencarian katalog seluruh alumni asisten lab dengan filter angkatan, keahlian, kota, dan status S2. |
| 6 | **Alumni** | Direct Connect | Tombol pintas menghubungi rekan alumni via WhatsApp / LinkedIn. |
| 7 | **Gigs** | Posting Kebutuhan (Create Gig) | Formulir membuat lowongan kolaborasi side-project dengan model budget *Transparent Range*. |
| 8 | **Gigs** | Applicants Drawer & Review | Drawer peninjauan pelamar: pesan pitching ($\le$ 250 karakter) dan 1-2 portofolio terlampir. |
| 9 | **Gigs** | Assign Contributor | Pemilihan kontributor; mengubah status ke `IN PROGRESS` dan membuka kontak chat pengerjaan. |
| 10 | **Gigs** | Selesai & Endorsement | Menandai pengerjaan selesai (`COMPLETED`) dan memberikan catatan endorsement skill ke profil kontributor. |
| 11 | **Gigs** | Quick Apply Gigs | Mengajukan minat pengerjaan proyek rekan alumni dengan melampirkan portofolio langsung dari profil. |
| 12 | **Showcase** | Publish Produk ke Beranda | Menerbitkan karya dari bank portofolio profil ke etalase publik (pilihan tahap: Beta vs Live). |
| 13 | **Showcase** | Beta Testing Feedback Hub | Wadah pengujian MVP: modal feedback 4 kategori terstruktur (Bug, UI/UX, Performa, Apresiasi) + Upvote. |
| 14 | **Showcase** | Manajemen Feedback Creator | Dasbor pemilik produk untuk merespons saran: tombol "Tandai Diperbaiki" atau "Saran Diterapkan". |
| 15 | **Showcase** | Reputasi Tester | Pemberian lencana profil otomatis (`Active Tester`) bagi alumni yang aktif menguji produk rekan. |
| 16 | **Referral** | Posting Peluang (#Referral) | Membagikan informasi lowongan di kantor masing-masing dengan tagar `#Referral` dan kriteria ringkas. |
| 17 | **Referral** | Minta Review & Referral | Mengajukan permohonan referral dengan pesan singkat ($\le$ 250 karakter) dan lampiran CV instan. |
| 18 | **Referral** | Fast Review Drawer ($\le$ 30 dtk) | Peninjau melihat CV pop-up instan dan memilih: "Hubungi via WA/LinkedIn" ATAU "Beri Masukan 1 Baris". |
| 19 | **Generate CV** | Generator CV Otomatis | Menghasilkan CV profesional format A4 print-ready langsung dari data profil, portofolio, dan riwayat gigs. |
| 20 | **Generate CV** | Preview & Cetak PDF | Pratinjau langsung tanpa unduh rumit, terintegrasi sebagai lampiran cepat pada Gigs & Referral. |
| 21 | **Profil Saya** | Single Source of Truth (SSOT) | Kelola biodata lengkap, kontak, sosial media, dan keahlian teknis. |
| 22 | **Profil Saya** | Tab Status Karir (Tracer) | Pengkinian status pekerjaan utama, freelance/moonlighting, dan rincian studi lanjut S2. |
| 23 | **Profil Saya** | Bank Karya & Portofolio | Penyimpanan repositori proyek pribadi, capstone, dan riwayat pengerjaan Gigs yang selesai. |

---

### B. Role: Koordinator (Admin Lab / Fasilitator)

| No | Modul | Fitur | Deskripsi Fungsional |
| :--- | :--- | :--- | :--- |
| 1 | **Dashboard** | Metrik Komunitas | Statistik total alumni terdaftar, persentase pengisian tracer, rasio angkatan, dan keahlian populer. |
| 2 | **Tracer** | Analitik Karir Real-Time | Grafik distribusi status karir (Bekerja, Wirausaha, Freelance, S2, Mencari Kerja) yang teragregasi otomatis. |
| 3 | **Tracer** | Matriks Masa Tunggu & Gaji | Visualisasi masa tunggu alumni memperoleh pekerjaan pertama dan sebaran bidang industri. |
| 4 | **Tracer** | Tabel Ekspor Data | Tabel data tracer lengkap dengan filter dinamis, fitur cetak, dan ekspor ke format Excel/CSV/PDF. |
| 5 | **Kurasi** | Kurasi Spotlight Produk | Fitur menyematkan (*pin*) produk live terbaik dari Hall of Fame ke carousel teratas Beranda selama 1 bulan. |
| 6 | **Data Alumni** | Verifikasi & Direktori | Verifikasi status keabsahan purna-tugas asisten lab dan pembaruan buku kontak alumni aktif. |
| 7 | **Pengumuman** | Broadcast Pengumuman | Menerbitkan info resmi lab/kampus ke linimasa Beranda seluruh alumni. |

---

### C. Role: SuperAdmin (Administrator Sistem)

| No | Modul | Fitur | Deskripsi Fungsional |
| :--- | :--- | :--- | :--- |
| 1 | **Pengguna** | Manajemen Akun Koordinator | Pembuatan akun koordinator baru, pembagian divisi (Dev / Data Science), edit, reset password, dan nonaktifkan akun. |
| 2 | **Master Data** | Pengaturan Master Angkatan & Divisi | Pengelolaan master data angkatan kelulusan, divisi spesialisasi lab, dan taksonomi kategori keahlian/tags. |
| 3 | **Sistem** | Log Audit & Pemantauan | Pelacakan log aktivitas penting, keamanan akses data pribadi, dan pemeliharaan platform. |

---

## 3. Diagram Alur Kerja Sistem (Mermaid Diagrams)

### A. Diagram Arsitektur Interaksi Global

```mermaid
graph TD
    subgraph ALUMNI_ECOSYSTEM["Ekosistem Alumni (P2P Horizontal)"]
        A1[Alumni Creator / Owner] <-->|Bengkod Gigs: Proyek & Tim| A2[Alumni Contributor]
        A1 <-->|Beta Testing Hub: Feedback & Upvote| A2
        A1 <-->|Internal Referral: Chat WA / Feedback 1 Baris| A2
        A1 & A2 -->|SSOT Profil: Karir, Gigs, Portofolio| P[Profil Saya & CV Builder]
    end

    subgraph KOORDINATOR_FLOW["Modul Koordinator (Fasilitator Lab)"]
        P -->|Data Karir Teragregasi Otomatis| K1[Analitik Tracer Study]
        A1 -.->|Karya Live di Hall of Fame| K2[Kurasi Spotlight Beranda]
        K3[Verifikasi Alumni & Direktori] -.->|Validasi Status Asisten| A1 & A2
    end

    subgraph SUPERADMIN_FLOW["Modul SuperAdmin"]
        SA[SuperAdmin] -->|Kelola Akun| KOORDINATOR_FLOW
        SA -->|Master Data Angkatan & Divisi| ALUMNI_ECOSYSTEM
    end
```

---

### B. Alur 1: Onboarding First-Login & Embedded Tracer Study

```mermaid
sequenceDiagram
    autonumber
    actor Alumni as Alumni Baru
    participant Web as Frontend Portal
    participant DB as Backend / Database
    participant Koor as Dashboard Koordinator

    Alumni->>Web: Login perdana (Auth Akun Asisten)
    Web->>DB: Cek status profil karir
    DB-->>Web: Status karir = KOSONG
    Web->>Alumni: Tampilkan Modal "Onboarding First-Login"
    Alumni->>Web: Isi status kerja, instansi/posisi, kota, & info S2
    Web->>DB: Simpan ke Profil Saya (Tab Status Karir)
    DB-->>Koor: Agregasi real-time grafik Tracer Study terupdate
    Web->>DB: Trigger kartu selamat datang di Feed Beranda
    Web-->>Alumni: Buka akses penuh ke Beranda
```

---

### C. Alur 2: Bengkod Gigs & Side-Project Exchange (P2P)

```mermaid
stateDiagram-v2
    [*] --> OPEN: Alumni Owner Posting Kebutuhan (Form Gigs + Budget Range)
    
    state OPEN {
        [*] --> MenungguPelamar
        MenungguPelamar --> ReviewDrawer: Rekan Alumni "Ajukan Minat" (Pitch + 1-2 Portofolio)
        ReviewDrawer --> KontributorDipilih: Owner Klik "Setujui Kontributor"
    }

    OPEN --> IN_PROGRESS: Status Berubah & Kontak WA Terbuka Otomatis
    
    state IN_PROGRESS {
        [*] --> PengerjaanEksternal: Koordinasi Teknis di GitHub / Slack / WA
        PengerjaanEksternal --> ReviewHasil: Kontributor Kirim Deliverables
    }

    IN_PROGRESS --> COMPLETED: Owner Klik "Tandai Selesai" & Beri Endorsement Skill
    IN_PROGRESS --> CANCELLED: Kesepakatan Dibatalkan Kedua Pihak

    COMPLETED --> SINKRONISASI_PROFIL: Masuk Riwayat Portofolio & Opsi Dicentang di Generate CV
    SINKRONISASI_PROFIL --> [*]
    CANCELLED --> [*]
```

---

### D. Alur 3: Hall of Fame & Beta Testing Hub (Siklus Produk)

```mermaid
flowchart TD
    Start([Karya di Profil Saya]) --> Publish[Klik 'Publish Produk ke Beranda']
    Publish --> PilihanTahap{Pilih Status Produk}

    %% Tahap Beta
    PilihanTahap -->|Tahap Pengembangan / MVP| Beta[BETA / TESTING\nBadge Oranye: Tester Wanted]
    Beta --> FeedBeta[Tampil di Filter 'Uji Coba Beta' Beranda]
    FeedBeta --> TesterUji[Rekan Alumni Uji Aplikasi via Link]
    TesterUji --> SubmitFeedback[Isi Modal Feedback Terstruktur:\n1. Bug\n2. UI/UX\n3. Performa\n4. Apresiasi + Upvote]
    SubmitFeedback --> NotifCreator[Creator Buka Tab 'Feedback & Testing']
    NotifCreator --> TindakanCreator[Aksi: 'Tandai Diperbaiki' / 'Saran Diterapkan']
    TindakanCreator --> Evaluasi{Sudah Matang & Stabil?}
    Evaluasi -->|Belum| Beta
    Evaluasi -->|Sudah Siap Rilis| Promote[Klik 'Ubah Status ke Live']

    %% Tahap Live
    PilihanTahap -->|Produk Sudah Siap Pakai| Live[LAUNCHED / LIVE\nBadge Hijau: Live Product]
    Promote --> Live
    Live --> Etalase[Katalog Hall of Fame Beranda]
    Etalase --> Kurasi{Dikurasi Koordinator?}
    Kurasi -->|Ya| Spotlight[Disematkan di Carousel Spotlight Beranda 1 Bulan]
    Kurasi -->|Tidak| Etalase
```

---

### E. Alur 4: Internal Referral Channel (Direct Connect & Masukan Singkat)

```mermaid
sequenceDiagram
    autonumber
    actor A_Pemberi as Alumni Pemberi Info
    participant Feed as Beranda Feed
    actor A_Pencari as Alumni Pencari Kerja
    participant Drawer as Applicants Drawer

    A_Pemberi->>Feed: Posting info karir dengan tag #Referral (Perusahaan, Posisi, Kriteria, Batas Waktu)
    A_Pencari->>Feed: Eksplorasi feed & temukan tag #Referral
    A_Pencari->>Feed: Klik "Minta Review & Referral"
    Note over A_Pencari,Feed: Lampirkan CV dari Generator + Pesan ringkas (maks 250 karakter)
    Feed->>Drawer: Notifikasi pengajuan masuk ke drawer A_Pemberi

    A_Pemberi->>Drawer: Buka kartu pelamar (Tinjau cepat <= 30 detik)
    A_Pemberi->>Drawer: Klik "Preview CV Bengkod" (Pop-up instan)

    alt Kualifikasi Cocok & Berpotensi
        A_Pemberi->>Drawer: Klik "Hubungi via WhatsApp / LinkedIn"
        Drawer-->>A_Pemberi: Buka chat langsung dengan prefilled template
        Note over A_Pemberi,A_Pencari: Bagi link karir internal, kode referral, atau titip CV ke tim rekruter
    else Belum Sesuai Kebutuhan
        A_Pemberi->>Drawer: Klik "Beri Masukan Singkat"
        A_Pemberi->>Drawer: Ketik 1 baris masukan konstruktif (contoh: "Butuh penguatan di Docker & CI/CD")
        Drawer-->>A_Pencari: Terima notifikasi saran pengembangan diri (Anti-Ghosting)
    end
```

---

### F. Alur 5: Generate CV & Sinkronisasi Portofolio

```mermaid
flowchart LR
    subgraph SSOT_DATA["Bank Data Profil Saya"]
        B1[(Biodata & Kontak)]
        B2[(Status Karir & Riwayat Kerja)]
        B3[(Bank Proyek Portofolio)]
        B4[(Riwayat Gigs COMPLETED)]
        B5[(Keahlian & Endorsement)]
    end

    SSOT_DATA --> Builder[Generator Mesin CV]

    subgraph CV_BUILDER["Fitur Generate CV"]
        Builder --> Config[Pilih Template & Centang Proyek yang Ditonjolkan]
        Config --> Preview[Preview Tampilan Lembar CV A4]
        Preview --> OutputPrint[Print-Ready A4 / Simpan PDF Bersih]
        Preview --> OutputAttach[Lampiran Otomatis di Gigs & Referral]
    end
```

---

### G. Alur 6: Modul Koordinator (Analitik Tracer & Kurasi Spotlight)

```mermaid
flowchart TD
    subgraph INPUT_DATA["Sumber Data Otomatis"]
        D1[Onboarding First-Login Alumni] --> DB[(Database Profil)]
        D2[Pembaruan Status Karir di Profil] --> DB
        D3[Katalog Produk Live di Hall of Fame] --> DBLive[(Database Produk)]
    end

    subgraph FITUR_KOORDINATOR["Modul Kerja Koordinator"]
        DB --> TracerDashboard[Analitik Tracer Study Real-Time]
        TracerDashboard --> ChartTracer[Grafik Distribusi Status & Masa Tunggu]
        TracerDashboard --> TableExport[Tabel Data Alumni & Ekspor Excel/PDF]
        
        DBLive --> KurasiPanel[Panel Kurasi Spotlight]
        KurasiPanel --> PinSpotlight[Pilih 1 Produk Terbaik -> Pin ke Carousel Beranda]
        
        DB --> VerifikasiPanel[Verifikasi Akun Asisten & Direktori Kontak]
    end
```

---

## 4. Konseptual Skema Data (ERD Mermaid)

```mermaid
erDiagram
    USERS ||--o{ ALUMNI_PROFILES : "memiliki"
    USERS ||--o{ PORTFOLIO_PROJECTS : "membuat"
    USERS ||--o{ GIGS : "membuat (owner)"
    USERS ||--o{ GIG_APPLICANTS : "melamar (contributor)"
    USERS ||--o{ REFERRAL_POSTS : "posting peluang"
    USERS ||--o{ REFERRAL_REQUESTS : "memohon referral"
    USERS ||--o{ PRODUCT_FEEDBACKS : "memberi masukan"

    USERS {
        bigint id PK
        string name
        string nim UK
        string email UK
        enum role "alumni, koordinator, superadmin"
        enum division "developer, data_science"
        int graduation_year
        string avatar_url
    }

    ALUMNI_PROFILES {
        bigint id PK
        bigint user_id FK
        text bio
        enum career_status "working, entrepreneur, freelance, s2, job_seeker"
        string current_job_title
        string company_name
        string city_domicile
        int wait_time_months
        string s2_university
        string s2_major
        string whatsapp_number
        string linkedin_url
        string github_url
        json skills_tags
    }

    PORTFOLIO_PROJECTS {
        bigint id PK
        bigint user_id FK
        string title
        string tagline
        text description
        json tech_stack
        string preview_url
        string repository_url
        enum stage "draft, beta_testing, launched_live"
        json review_focus_tags
        boolean is_spotlight
        int upvote_count
    }

    PRODUCT_FEEDBACKS {
        bigint id PK
        bigint project_id FK
        bigint reviewer_id FK
        enum category "bug, ui_ux, performance, appreciation"
        text content
        boolean is_resolved
        datetime created_at
    }

    GIGS {
        bigint id PK
        bigint owner_id FK
        string title
        enum role_category "frontend, backend, mobile, ui_ux, qa, fullstack"
        json tech_stack
        text description
        enum budget_range "under_1m, 1m_to_3m, 3m_to_5m, above_5m, profit_sharing"
        date deadline
        int team_quota
        enum status "open, in_progress, completed, cancelled"
        datetime created_at
    }

    GIG_APPLICANTS {
        bigint id PK
        bigint gig_id FK
        bigint applicant_id FK
        string pitch_message "maks 250 karakter"
        json attached_portfolio_ids
        enum status "pending, accepted, rejected"
        datetime applied_at
    }

    GIG_ENDORSEMENTS {
        bigint id PK
        bigint gig_id FK
        bigint giver_id FK
        bigint recipient_id FK
        text endorsement_text
        json endorsed_skills
    }

    REFERRAL_POSTS {
        bigint id PK
        bigint author_id FK
        string company_name
        string role_title
        enum exp_level "freshgrad, junior, mid, senior"
        text criteria_summary
        date review_deadline
        enum status "active, closed"
    }

    REFERRAL_REQUESTS {
        bigint id PK
        bigint referral_id FK
        bigint applicant_id FK
        string pitch_message "maks 250 karakter"
        enum status "pending, contacted_via_chat, feedback_given"
        text feedback_one_line
    }
```

---

## 5. Rencana Tahapan Eksekusi (Roadmap)

1. **Fase 1: Pembersihan & Restrukturisasi Prototype**
   - Menghapus total seluruh view, aset, dan skrip yang berkaitan dengan peran Mitra.
   - Mengonsolidasikan navigasi sidebar alumni menjadi 5 menu resmi (Beranda, Alumni, Gigs, CV, Profil).
2. **Fase 2: Implementasi Modul Gigs & Showcase**
   - Mengembangkan papan Bengkod Gigs (filter, modal post, applicants drawer, status state machine).
   - Mengembangkan etalase Hall of Fame & modal feedback Beta Testing Hub.
3. **Fase 3: Implementasi Referral & Profil SSOT**
   - Merapikan postingan tag `#Referral` di Beranda dan drawer 2 tombol aksi.
   - Menyatukan data karir (tracer study) ke dalam tab status karir `Profil Saya`.
4. **Fase 4: Penyelarasan Koordinator & Sinkronisasi Data**
   - Menyesuaikan dashboard koordinator agar membaca data tracer langsung dari profil alumni.
   - Menyediakan fitur kurasi pin Spotlight produk bulanan.

