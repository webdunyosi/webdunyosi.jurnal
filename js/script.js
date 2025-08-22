// Google Sheets API link
const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLibYVY-AMXCiDEbMRr-YN3TZVLyLbxMXjCyyrvFQ6_e_6gRRqp3LgBL9rFiwR_ZKBXlZhyuJJGGeKuFNfUnTgJMtuGlQ8D-Xo8LZSFvaGsJTkqXeaEhhwz3j1CZU8Lo--7mDuT1Oiig7zg-SH9-ahnfW4GjZw9A5bZelJSKOHUezWbUYam5DCrduGVLC54WZwGE_gYCvaCK56uin8wBvni28fs6NEaHqOJAZY5X6b2I_DrTYIvk5hJjdgt2otg7z6qqx-skwTSEuH5c2jogIM7Fx2zD3g&lib=MCrU1areedxLHfeXWcHoODQY0VAoHi_0T"

const loading = document.getElementById("loading")
const productsBody = document.getElementById("productsBody")
const searchInput = document.getElementById("searchInput")

let productsData = []

function renderRows(rows) {
  productsBody.innerHTML = ""
  const fragment = document.createDocumentFragment()
  rows.forEach((item, index) => {
    const number = item["№"] ?? index + 1
    const ism = item["Ism familiya"] || "Noma'lum ism"
    const css = item["css"] ?? "-"
    const tailwindcss = item["tailwindcss"] ?? "-"
    const js = item["js"] ?? "-"
    const backend = item["backend"] ?? "-"

    const row = document.createElement("tr")
    row.className =
      "odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"

    row.innerHTML = `
          <td class="px-4 py-3 text-sm font-semibold text-gray-800">${number}</td>
          <td class="px-4 py-3 text-sm font-medium text-gray-900">${ism}</td>
          <td class="px-4 py-3 text-sm text-gray-700">${css}</td>
          <td class="px-4 py-3 text-sm text-gray-700">${tailwindcss}</td>
          <td class="px-4 py-3 text-sm text-gray-700">${js}</td>
          <td class="px-4 py-3 text-sm text-gray-700">${backend}</td>
        `

    fragment.appendChild(row)
  })
  productsBody.appendChild(fragment)
}

function debounce(fn, delay = 200) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

const handleSearch = debounce(() => {
  const q = (searchInput?.value || "").trim().toLowerCase()
  if (!q) {
    renderRows(productsData)
    return
  }
  const filtered = productsData.filter((item) => {
    const fields = [
      item["№"],
      item["Ism familiya"],
      item["css"],
      item["tailwindcss"],
      item["js"],
      item["backend"],
    ]
      .map((v) => (v == null ? "" : String(v).toLowerCase()))
      .join(" ")
    return fields.includes(q)
  })
  renderRows(filtered)
}, 250)

// Ma'lumotlarni olish
async function fetchProducts() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    console.log("Sheet Data:", data)
    productsData = Array.isArray(data) ? data : []

    // Loading spinnerni yashirish
    loading.style.display = "none"

    // Jadvalni to'ldirish
    renderRows(productsData)
    if (searchInput) {
      searchInput.addEventListener("input", handleSearch)
    }
  } catch (error) {
    loading.innerHTML =
      "<p class='text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2'>Xatolik yuz berdi! API ishlamadi.</p>"
    console.error(error)
  }
}

fetchProducts()
