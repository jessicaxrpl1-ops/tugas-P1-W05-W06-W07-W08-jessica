// JavaScript portofolio Jessica Amelia Sachi
// Dipasang di ketiga halaman dengan defer
// 1. Daftar keahlian (halaman Beranda), data dari data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");
async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();
    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang 
sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}
if (daftarSkill) {
  muatKeahlian();
}

// =====================================
// 2. TEMA GELAP
// =====================================

const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang";
    } else {
      tombolTema.textContent = "Mode Gelap";
    }
  });
}

// 3. Penghitung karakter pesan (halaman kontak)
const kontakPesan = document.querySelector("#pesan");
const kontakHitung = document.querySelector("#hitung-karakter");

if (kontakPesan && kontakHitung) {
	kontakHitung.textContent = `${kontakPesan.value.length}/300 karakter`;

	kontakPesan.addEventListener("input", () => {
		kontakHitung.textContent = `${kontakPesan.value.length}/300 karakter`;
	});
}

// =====================================
// 4. DAFTAR PROYEK
// =====================================

const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/proyek-profil.png",
    alt: "Halaman profil pertama",
    deskripsi: "Halaman web pertama saya dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Form kontak",
    deskripsi: "Form dengan label dan validasi browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/proyek-jadwal.png",
    alt: "Tabel jadwal belajar",
    deskripsi: "Jadwal belajar mingguan menggunakan tabel HTML.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/proyek-responsif.png",
    alt: "Portofolio responsif",
    deskripsi: "Website responsif menggunakan Flexbox.",
  },
{
  judul: "Kalkulator Nilai Rapor",
  kategori: "JavaScript",
  gambar: "img/proyek-nilai.png",
  alt: "Tangkapan layar kalkulator nilai rapor",
  deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
},

{
  judul: "Lima Soal Logika",
  kategori: "JavaScript",
  gambar: "img/proyek-soal.png",
  alt: "Tangkapan layar soal logika",
  deskripsi: "Lima fungsi logika JavaScript.",
},
];

// =====================================
// 5. MENAMPILKAN PROYEK
// =====================================

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek) return;

  const semuaKartu = daftar.map((item) => buatKartu(item));

  daftarProyek.innerHTML = semuaKartu.join("");

  if (jumlahProyek) {
    jumlahProyek.textContent =
      `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) return;

  tombol.addEventListener("click", () => {

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      const hasil = proyek.filter(
        (item) => item.kategori === kategori
      );

      tampilkanProyek(hasil);
    }

  });
}

if (daftarProyek) {
  tampilkanProyek(proyek);

  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "jessicaxrpl1-ops";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");
if (daftarRepo) {
    async function ambilRepo() {
        try {
            const response = await fetch(alamatRepo + pilihan);
            if (!response.ok) {
                throw new Error(`GitHub mengembalikan status ${response.status}`);
            }

            const repos = await response.json();
            repos.forEach((repo) => {
                const item = document.createElement("li");
                const tautan = document.createElement("a");
                tautan.href = repo.html_url;
                tautan.target = "_blank";
                tautan.rel = "noopener noreferrer";
                tautan.textContent = repo.name;
                item.appendChild(tautan);
                item.append(
                  ` (${repo.language || "tanpa bahasa"}, ${repo.stargazers_count} bintang)`
                );
                daftarRepo.appendChild(item);
            });
            statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
        } catch (error) {
            statusRepo.textContent =  "Maaf, daftar repository tidak dapat dimuat. Periksa koneksi atau nama akun GitHub.";
            console.error("Gagal memuat repositori GitHub:", error);
        }
    }

    ambilRepo();
}