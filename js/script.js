let menu = [
  {
    id: 1,
    nama: "Bacon Burger",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "food",
    harga: 27272,
    foto: "BaconKingJr.png",
  },
  {
    id: 2,
    nama: "Burger Keju",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "food",
    harga: 36363,
    foto: "DoubleCheeseburger.png",
  },
  {
    id: 3,
    nama: "Krabby Patty",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "food",
    harga: 45454,
    foto: "MorningStarVeggieBurger.png",
  },
  {
    id: 4,
    nama: "White Water",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "drink",
    harga: 3636,
    foto: "NestlePureLifeWater.png",
  },
  {
    id: 5,
    nama: "Cola",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "drink",
    harga: 5454,
    foto: "CocaCola.png",
  },
  {
    id: 6,
    nama: "Sprite",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "drink",
    harga: 5454,
    foto: "Sprite.png",
  },
  {
    id: 7,
    nama: "Pancakes",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "snack",
    harga: 9090,
    foto: "PancakesandSausages.png",
  },
  {
    id: 8,
    nama: "Chicken Nugget",
    detail: "Cita rasa yang sangat dalam terdapat di Pink Donuts ini.",
    kategori: "snack",
    harga: 9090,
    foto: "ChickenNuggets.png",
  },
];

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = [
  "Bacon Burger",
  "Burger Keju",
  "Krabby Patty",
  "White Water",
  "Cola",
  "Sprite",
  "Pancakes",
  "Chicken Nugget",
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);

localStorage.clear();
let user = {};

function loadData() {
  setPage("home");
  initialLoad();
}

function initialLoad() {
  if (!localStorage.menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  }
  loadProfile();
  setTimeout(function () {
    $(".preloader").hide();
  }, 1000);
}
$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
});

function loadMenu() {
  var data_menu = JSON.parse(localStorage.getItem("menu"));
  var data_food = "";
  var data_drink = "";
  var data_snack = "";
  for (i in data_menu) {
    var menu_item =
      `	<div class="card border-success mb-3 col-11 mx-auto rounded my-2 p-3" onClick="addToCart(` +
      data_menu[i].id +
      `)">
		<div class="d-flex justify-content-start align-items-center">
			<div class="col-sm-4">
				<img src="img/menu/` +
      data_menu[i].foto +
      `" style="width: 120px; background-color: #FFEFDF;" class="card-img img-fluid" alt="card image">
				
			</div>
		<div class="col-sm-8">
				<p class="menu-name">` +
      data_menu[i].nama +
      `</p>
				<p class="detail">` +
      data_menu[i].detail +
      `</p>
				<span class="menu-price">Rp. ` +
      formatRupiah(data_menu[i].harga) +
      `</span>
			
				<a class="btn btn-success float-right btn-tambah">
				<i class="fas fa-plus"></i>
				</a>
		</div>
	</div>
</div>`;
    if (data_menu[i].kategori == "food") {
      data_food += menu_item;
    } else if (data_menu[i].kategori == "drink") {
      data_drink += menu_item;
    } else if (data_menu[i].kategori == "snack") {
      data_snack += menu_item;
    }
  }
  $("#food-menu").html(data_food);
  $("#drink-menu").html(data_drink);
  $("#snack-menu").html(data_snack);
}

function loadCart() {
  // cart page data
  var cart = [];
  var data_cart = "";
  var total_cart = 0;
  if (localStorage.cart) {
    cart = JSON.parse(localStorage.getItem("cart"));
    $("#cart-info").show();
    for (i in cart) {
      var nominal = cart[i].jumlah * cart[i].harga;
      data_cart +=
        `<div class="col-12 text-center">
			<img src="img/menu/` +
        cart[i].foto +
        `" style="width: 80%;" class="card-img img-fluid pt-2" alt="card image">
		</div>
		<div class="cart-item row my-1">
			<div class="col-6 text-left" style="padding-left:30px;">
				<span class="menu-name">` +
        cart[i].nama +
        `</span>
			</div>

			<div class="col-6 text-right" style="padding-right:30px;">
				` +
        formatRupiah(nominal) +
        `

			</div>
		</div>

		<div class="col-12 pl-0 text-right">
			<a href="javascript:void(0)" class="btn btn-sm btn-success btn-cart-action" title="Kurangi"
				onClick="minNumCart(` +
        cart[i].id +
        `)"><i class="fa fa-minus"></i></a>
			<span class="px-1">` +
        cart[i].jumlah +
        `</span>
			<a href="javascript:void(0)" class="btn btn-sm btn-success btn-cart-action" title="Tambah"
				onClick="addNumCart(` +
        cart[i].id +
        `)"><i class="fa fa-plus"></i></a>
			<a href="javascript:void(0)" class="btn btn-sm btn-danger btn-cart-action" title="Hapus"
				onClick="deleteCart(` +
        cart[i].id +
        `)"><i class="fa fa-trash"></i></a>
		</div>`;
      total_cart = total_cart + nominal;

      $("#cart-content").html(data_cart);
      $("#total-cart").html(formatRupiah(total_cart));

      var ppn = (total_cart * 10) / 100;
      ppn = parseInt(ppn);
      $("#ppn").html(formatRupiah(ppn));

      var total_bayar = total_cart + ppn;
      $("#total-bayar").html(formatRupiah(total_bayar));
    }
  } else {
    $("#cart-info").hide();
    data_cart += `<div class="alert alert-success">Keranjang anda masih kosong.</div>`;
    $("#cart-content").html(data_cart);
  }

  // cart icon in home
  if (!localStorage.cart) {
    $("#cart_num").hide();
    $("#cart_num_menu").hide();
  } else {
    $("#cart_num").show();
    $("#cart_num_menu").show();
    $("#cart_num").html(cart.length);
    $("#cart_num_menu").html(cart.length);
  }
}

function loadOrder() {
  var order = [];
  var data_order = "";
  if (localStorage.order) {
    order = JSON.parse(localStorage.getItem("order"));
    for (i in order) {
      // hitung total dahulu
      var total_pesanan = 0;
      for (j in order[i].menu) {
        var nominal = order[i].menu[j].jumlah * order[i].menu[j].harga;
        total_pesanan = total_pesanan + nominal;
      }
      var ppn = parseInt((total_pesanan * 10) / 100);
      var total_bayar = total_pesanan + ppn;

      var date = new Date(order[i].tanggal);
      date =
        date.getDate() +
        " " +
        numToMonth(date.getMonth()) +
        " " +
        date.getFullYear() +
        " pukul " +
        date.getHours() +
        ":" +
        date.getMinutes();
      data_order +=
        `<div class="order-item my-2" onClick="showOrder(` +
        order[i].id +
        `)">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-3">
											<img src="img/menu/` +
        order[i].menu[0].foto +
        `" class="img-fluid">
										</div>
										<div class="col-9">
											<h5 class="menu-name">` +
        order[i].menu[0].nama +
        `</h5>
											<p class="menu-price text-right">Rp ` +
        formatRupiah(order[i].menu[0].harga) +
        ` x ` +
        order[i].menu[0].jumlah +
        `</p>
											<hr class="m-0" />
											<p class="text-right"><small>` +
        order[i].menu.length +
        ` Item</small></p>
										</div>

										<div class="col-8 text-right">
											<b>TOTAL</b>
										</div>
										<div class="col-4 text-right">
											Rp ` +
        formatRupiah(total_bayar) +
        `
										</div>

										<div class="col-12">
											<small><i>Dipesan pada <b>` +
        date +
        `</b></i></small>
										</div>
									</div>
								</div>
							</div>
						</div>`;
    }
  } else {
    data_order += `<div class="alert alert-success m-3">Belum ada pesanan dari anda</div>`;
  }
  $("#order-content").html(data_order);
}

function loadProfile() {
  if (liff.isLoggedIn()) {
    $("#profile-wrapper").show();
    $("#not-login").hide();
    liff
      .getProfile()
      .then(function (profile) {
        user = profile;
        $("#profile-user-id").html(profile.userId);
        $("#profile-display-name").html(profile.displayName);
        $("#profile-photo img").attr("src", profile.pictureUrl);
        $("#profile-status-msg").html(profile.statusMessage);

        $("#profile-os").html(liff.getOS());
        if (liff.isInClient()) {
          $("#profile-line-v").html(liff.getLineVersion());
        } else {
          $("#profile-line-v").html(
            "<small><i>Tidak terbuka di LINE</i></small>"
          );
        }
      })
      .catch(function (error) {
        $("#modal-message").html("Error: " + error);
        $("#modalAlert").modal("show");
      });
  } else {
    $("#profile-wrapper").hide();
    $("#not-login").show();
  }
}

function addToCart(id_menu) {
  // cek cart
  var cart = "";
  if (localStorage.cart) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for (i in cart) {
      if (cart[i].id == id_menu) {
        $("#modal-message").html("Menu sudah ada dalam keranjang");
        $("#modalAlert").modal("show");
        return false;
      }
    }
  } else {
    cart = [];
  }

  // penambahan cart
  var data_menu = JSON.parse(localStorage.getItem("menu"));
  var cart_item = "";
  for (i in data_menu) {
    if (data_menu[i].id == id_menu) {
      cart_item = {
        id: data_menu[i].id,
        nama: data_menu[i].nama,
        kategori: data_menu[i].kategori,
        harga: data_menu[i].harga,
        foto: data_menu[i].foto,
        jumlah: 1,
      };
    }
  }
  cart.push(cart_item);
  localStorage.setItem("cart", JSON.stringify(cart));
  setPage("cart");
}

function deleteCart(id_menu) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var index = 0;
  for (i in cart) {
    if (cart[i].id == id_menu) {
      cart.splice(index, 1);
    }
    index++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  if (cart.length == 0) {
    localStorage.removeItem("cart");
  }
  loadCart();
}

function addNumCart(id_menu) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var cart_item = "";
  var index = 0;
  for (i in cart) {
    if (cart[i].id == id_menu) {
      cart_item = {
        id: cart[i].id,
        nama: cart[i].nama,
        kategori: cart[i].kategori,
        harga: cart[i].harga,
        foto: cart[i].foto,
        jumlah: cart[i].jumlah + 1,
      };
      cart.splice(index, 1); // dihapus, habis itu push lagi
    }
    index++;
  }
  cart.push(cart_item);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function minNumCart(id_menu) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var cart_item = "";
  var index = 0;
  for (i in cart) {
    if (cart[i].id == id_menu) {
      cart_item = {
        id: cart[i].id,
        nama: cart[i].nama,
        kategori: cart[i].kategori,
        harga: cart[i].harga,
        foto: cart[i].foto,
        jumlah: cart[i].jumlah - 1,
      };
      cart.splice(index, 1); // dihapus, habis itu push lagi
    }
    index++;
  }
  cart.push(cart_item);
  localStorage.setItem("cart", JSON.stringify(cart));

  // kalau 0 hapus dari list
  if (cart_item.jumlah == 0) {
    deleteCart(cart_item.id);
  }
  loadCart();
}

function addOrder() {
  // ambil semua item dari cart, push ke local storage order, kosongkan cart
  if (localStorage.cart) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var order = [];
    var order_item = {};
    var index = 0;
    if (localStorage.order) {
      order = JSON.parse(localStorage.getItem("order"));
      index = order.length;
    }
    var timestamp = new Date();
    order_item = {
      id: index + 1,
      tanggal: timestamp,
      menu: cart,
    };
    order.push(order_item);
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem("cart");
    setPage("order");

    // message
    // Jhonarendra membuat pesanan baru! Burger 2, Pancake 3, Sprite 4 dengan total pesanan Rp 200.000
    var msg_order = "";
    if (liff.isLoggedIn()) {
      msg_order += user.displayName + " membuat pesanan baru! ";
    } else {
      msg_order += "Anda membuat pesanan baru! ";
    }

    var total_pesanan = 0;
    for (i in cart) {
      var nominal = cart[i].jumlah * cart[i].harga;
      total_pesanan = total_pesanan + nominal;

      msg_order += cart[i].nama + " (" + cart[i].jumlah + ")";
      if (i == cart.length - 2) {
        // mengatasi koma komaan
        msg_order += " dan ";
      } else if (i == cart.length - 1) {
        msg_order += "";
      } else {
        msg_order += ", ";
      }
    }
    var ppn = parseInt((total_pesanan * 10) / 100);
    var total_bayar = total_pesanan + ppn;
    msg_order +=
      " dengan total pesanan Rp " +
      formatRupiah(total_bayar) +
      ". Terima kasih banyak!";

    if (!liff.isInClient()) {
      $("#modal-message").html(msg_order);
      $("#modalAlert").modal("show");
    } else {
      liff
        .sendMessages([
          {
            type: "text",
            text: msg_order,
          },
        ])
        .catch(function (error) {
          $("#modal-message").html("Error sending message: " + error);
          $("#modalAlert").modal("show");
        });
    }
  } else {
    $("#modal-message").html("Anda belum memilih menu");
    $("#modalAlert").modal("show");
  }
}

function showOrder(id) {
  setPage("order-detail");
  var order = JSON.parse(localStorage.getItem("order"));
  var order_item = [];
  for (i in order) {
    if (order[i].id == id) {
      order_item = order[i];
    }
  }

  // add zero at minutes
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  var datetime = new Date(order_item.tanggal);
  var date =
    datetime.getDate() +
    " " +
    numToMonth(datetime.getMonth()) +
    " " +
    datetime.getFullYear();
  var time = datetime.getHours() + ":" + addZero.getMinutes();
  $("#tanggal-detail-order").html(date);
  $("#jam-detail-order").html(time);

  var data_order_detail = "";
  var total_order_detail = 0;
  for (i in order_item.menu) {
    var nominal = order_item.menu[i].harga * order_item.menu[i].jumlah;
    total_order_detail = total_order_detail + nominal;
    data_order_detail +=
      `<div class="order-detail-item row my-1">
								<div class="col-4 pr-0">
									<span class="menu-name">` +
      order_item.menu[i].nama +
      `</span>
								</div>
								<div class="col-3 px-0 text-right">
									<span class="px-1">` +
      formatRupiah(order_item.menu[i].harga) +
      `</span>
								</div>
								<div class="col-2 px-0">
									<span class="px-1"> x ` +
      order_item.menu[i].jumlah +
      `</span>
								</div>
								<div class="col-3 pl-0 text-right">
									` +
      formatRupiah(nominal) +
      `
								</div>
							</div>`;
  }
  $("#order-detail-content").html(data_order_detail);
  $("#total-order-detail").html(formatRupiah(total_order_detail));

  var ppn = parseInt((total_order_detail * 10) / 100);
  $("#ppn-order-detail").html(formatRupiah(ppn));

  var total_bayar = total_order_detail + ppn;
  $("#total-bayar-order-detail").html(formatRupiah(total_bayar));
}

function clearTransaction() {
  localStorage.removeItem("cart");
  localStorage.removeItem("order");

  $("#modal-message").html("Data transaksi berhasil dihapus");
  $("#modalAlert").modal("show");
}

function liffOpenWindow() {
  if (!liff.isInClient()) {
    $("#modal-message").html(
      "Fungsi ini tidak tersedia pada browser eksternal"
    );
    $("#modalAlert").modal("show");
  } else {
    liff.openWindow({
      url: "https://liff.line.me/1655817666-VQPqWLB1",
      external: true,
    });
  }
}

function liffCloseApp() {
  if (!liff.isInClient()) {
    $("#modal-message").html(
      "Fungsi ini tidak tersedia pada browser eksternal"
    );
    $("#modalAlert").modal("show");
  } else {
    liff.closeWindow();
  }
}

function liffLogin() {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

function liffLogout() {
  if (liff.isLoggedIn()) {
    if (liff.isInClient()) {
      $("#modal-message").html("Fitur logout tersedia untuk browser eksternal");
      $("#modalAlert").modal("show");
    } else {
      liff.logout();
      window.location.reload();
    }
  }
}

function setPage(menu) {
  if (menu == "home") {
    loadCart();
    $("#home").show();
    $("#menu").hide();
    $("#order").hide();
    $("#account").hide();
    $("#cart").hide();
    $("#order-detail").hide();

    $("#nav").show();
    $("#order-btn").hide();
  } else if (menu == "menu") {
    loadMenu();
    loadCart();
    $("#home").hide();
    $("#menu").show();
    $("#order").hide();
    $("#account").hide();
    $("#cart").hide();
    $("#order-detail").hide();

    $("#nav").show();
    $("#order-btn").hide();
  } else if (menu == "order") {
    loadOrder();
    $("#home").hide();
    $("#menu").hide();
    $("#order").show();
    $("#account").hide();
    $("#cart").hide();
    $("#order-detail").hide();

    $("#nav").show();
    $("#order-btn").hide();
  } else if (menu == "account") {
    loadProfile();
    $("#home").hide();
    $("#menu").hide();
    $("#order").hide();
    $("#account").show();
    $("#cart").hide();
    $("#order-detail").hide();

    $("#nav").show();
    $("#order-btn").hide();
  } else if (menu == "cart") {
    loadCart();
    $("#home").hide();
    $("#menu").hide();
    $("#order").hide();
    $("#account").hide();
    $("#cart").show();
    $("#order-detail").hide();

    $("#nav").hide();
    $("#order-btn").show();
  } else if (menu == "order-detail") {
    loadCart();
    $("#home").hide();
    $("#menu").hide();
    $("#order").hide();
    $("#account").hide();
    $("#cart").hide();
    $("#order-detail").show();

    $("#nav").hide();
    $("#order-btn").hide();
  }
}

function formatRupiah(angka) {
  var angka = angka.toString();

  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split("."),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
}

function numToMonth(bulan) {
  switch (bulan) {
    case 0:
      bulan = "Januari";
      break;
    case 1:
      bulan = "Februari";
      break;
    case 2:
      bulan = "Maret";
      break;
    case 3:
      bulan = "April";
      break;
    case 4:
      bulan = "Mei";
      break;
    case 5:
      bulan = "Juni";
      break;
    case 6:
      bulan = "Juli";
      break;
    case 7:
      bulan = "Agustus";
      break;
    case 8:
      bulan = "September";
      break;
    case 9:
      bulan = "Oktober";
      break;
    case 10:
      bulan = "November";
      break;
    case 11:
      bulan = "Desember";
      break;
  }
  return bulan;
}

// let cart = [
// 	{ nama: 'Chicken Nugget', kategori: 'snack', harga: 9090, foto: 'ChickenNuggets.png', jumlah: 4}
// ]

// let order = [
// 	{
// 		id: 1,
// 		tanggal: '12-12-2020 23:59:59',
// 		menu: [
// 			{ id: 2, nama: 'Chicken Nugget', kategori: 'snack', harga: 9090, foto: 'ChickenNuggets.png', jumlah: 4},
// 			{ id: 6, nama: 'Sprite', kategori: 'drink', harga: 5454, foto: 'Sprite.png', jumlah: 7}
// 		]
// 	},
// 	{
// 		id: 1,
// 		tanggal: '12-12-2020 23:59:59',
// 		menu: [
// 			{ id: 6, nama: 'Sprite', kategori: 'drink', harga: 5454, foto: 'Sprite.png', jumlah: 7},
// 			{ id: 2, nama: 'Chicken Nugget', kategori: 'snack', harga: 9090, foto: 'ChickenNuggets.png', jumlah: 4},
// 			{ id: 3, nama: 'Burger Keju', kategori: 'food', harga: 36363, foto: 'DoubleCheeseburger.png', jumlah: 14}
// 		]
// 	}
// ]
