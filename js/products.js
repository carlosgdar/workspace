const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
// SE LLAMA A LAS CONSTANTES
function sortproduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) { 
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}

function showproducts(data) {
    //compruebo que la data no esta vacia
    if (data != undefined) {
        //guardo la data en mi variable curentcategoryArray
        currentProductsArray = data;
    }
    showproductsList(); // llama la funcion
}

function showproductsList() {
    // esta vacia, array porque ya lo guardamos en una varable

    //   console.log(currentProductsArray) es como prueba los datos estan llegando
    let htmltext = "";
    // sea i = 0, mientras i sea menor al tamano de nuestro arreay, a i le sumo 1
    for (let i = 0; i < currentProductsArray.length; i++) {
        // recorrer los 5 productos usando la variable i
        let product = currentProductsArray[i]; //declarando product de la variable i del array

        if (
            (minCount == undefined ||
                (minCount != undefined &&
                    parseInt(product.cost) >= minCount)) &&
            (maxCount == undefined ||
                (maxCount != undefined && parseInt(product.cost) <= maxCount))
        ) {
            htmltext +=
                `
         <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` +
                product.imgSrc +
                `" alt="` +
                product.description +
                `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` +
                product.name +
                `</h4>
                    <small class="text-muted">` +
                product.soldCount +
                ` vendidos</small>
                </div>
                <p class=""> ` +
                product.currency +
                product.cost +
                ` </p>
                <p class="mb-1">` +
                product.description +
                `</p>
            </div>
        </div>
    </a>
      `;
        }
    }
    //luego de que creamos nuestro texto con todos los product, buscamos el div por su id y le agregamos el texto
    document.getElementById("pro-list-container").innerHTML = htmltext;
}

function sortAndshowproducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortproduct(
        currentSortCriteria,
        currentProductsArray
    );

    //Muestro las categorías ordenadas
    showproductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de

//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //luego que obtiene la data, la funcion recibe el resultado
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // comprueba que recibe un ok
            showproducts(resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndshowproducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndshowproducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndshowproducts(ORDER_BY_PROD_COUNT);
    });

    document
        .getElementById("clearRangeFilter")
        .addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            minCount = undefined;
            maxCount = undefined;

            showproductsList();
        });

    document
        .getElementById("rangeFilterCount")
        .addEventListener("click", function () {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;

            if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
                minCount = parseInt(minCount);
            } else {
                minCount = undefined;
            }

            if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
                maxCount = parseInt(maxCount);
            } else {
                maxCount = undefined;
            }

            showproductsList();
        });
});