// Google Sheets API link
const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLibYVY-AMXCiDEbMRr-YN3TZVLyLbxMXjCyyrvFQ6_e_6gRRqp3LgBL9rFiwR_ZKBXlZhyuJJGGeKuFNfUnTgJMtuGlQ8D-Xo8LZSFvaGsJTkqXeaEhhwz3j1CZU8Lo--7mDuT1Oiig7zg-SH9-ahnfW4GjZw9A5bZelJSKOHUezWbUYam5DCrduGVLC54WZwGE_gYCvaCK56uin8wBvni28fs6NEaHqOJAZY5X6b2I_DrTYIvk5hJjdgt2otg7z6qqx-skwTSEuH5c2jogIM7Fx2zD3g&lib=MCrU1areedxLHfeXWcHoODQY0VAoHi_0T"

const loading = document.getElementById("loading")
const productsContainer = document.getElementById("products")

// Ma'lumotlarni olish
async function fetchProducts() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    console.log("Sheet Data:", data)

    // Loading spinnerni yashirish
    loading.style.display = "none"

    // Har bir mahsulotni chiqarish
    data.forEach((item) => {
      const number = item["№"] || "№"
      const ism = item["Ism familiya"] || "Noma'lum ism"
      const price = item["09/01 (18:00)"] || "-"
      const image = item["09/03 (18:00)"] || "-"
      const js = item["js"] || "-"

      const card = document.createElement("tr")
      card.className = "bg-amber-300"

      card.innerHTML = `
            <td class="border-2 py-1 px-5 font-bold">${number}</td>
            <td class="border-2 py-1 px-5 font-bold">${ism}</td>
            <td class="border-2 py-1 px-5">${price}</td>
            <td class="border-2 py-1 px-5">${image}</td>
            <td class="border-2 py-1 px-5">${js}</td>
          `

      productsContainer.appendChild(card)
    })
  } catch (error) {
    loading.innerHTML =
      "<p class='text-red-500'>Xatolik yuz berdi! API ishlamadi.</p>"
    console.error(error)
  }
}

fetchProducts()
