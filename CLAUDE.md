# Aturan Claude Code — `alumni-bengkod-prototype`

## ZONA TERLARANG (STRICT DO-NOT-TOUCH): Folder `mitra/` & `superadmin/mitra.html`
- Role login Mitra telah **dihapus 100% dari sistem**. Folder `./mitra/` dan berkas `./superadmin/mitra.html` berstatus terisolasi (kandidat penghapusan permanen).
- **DILARANG KERAS** membaca, menyunting, membuat berkas, mereferensikan, memigrasikan, atau mengaudit isi `./mitra/` maupun `./superadmin/mitra.html`, kecuali pengguna secara eksplisit memerintahkan penghapusannya. Akses tool terhadap path tersebut diblokir di `.claude/settings.local.json`.
- **Pengecualian aktif:** `./koordinator/mitra.html` **TETAP AKTIF** (Direktori Instansi Penyerap Alumni hasil tracer study, bukan role login Mitra).
