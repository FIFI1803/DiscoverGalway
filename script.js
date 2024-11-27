/*Fade in*/
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const handleScroll = () => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

/*Email Validator*/
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = document.getElementById("email");
            if (!emailInput.checkValidity()) {
                emailInput.classList.add("is-invalid");
            } else {
                emailInput.classList.remove("is-invalid");

                const successMessage = document.getElementById("successMessage");
                if (successMessage) {
                    successMessage.classList.remove("d-none");

                    this.reset();

                    setTimeout(() => {
                        successMessage.classList.add("d-none");
                    }, 3000);
                }
            }
        });
    }
});

/*Add to Basket Card verify*/
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const basket = document.getElementById("basket");
    const totalElement = document.getElementById("total");
    const emptyMessage = document.getElementById("emptyMessage");
    const cardForm = document.getElementById("cardForm");
    const purchaseButton = document.createElement("button");

    let total = 0;


    if (addToCartButtons && basket && totalElement && emptyMessage) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const itemName = button.getAttribute("data-name");
                const itemPrice = parseFloat(button.getAttribute("data-price"));

                if (!itemName || isNaN(itemPrice)) return;

                emptyMessage.style.display = "none";

                const listItem = document.createElement("li");
                listItem.className =
                    "list-group-item d-flex justify-content-between align-items-center";
                listItem.textContent = itemName;

                const priceBadge = document.createElement("span");
                priceBadge.className = "badge bg-primary rounded-pill";
                priceBadge.textContent = `€${itemPrice.toFixed(2)}`;
                listItem.appendChild(priceBadge);

                const removeButton = document.createElement("button");
                removeButton.className = "btn btn-danger btn-sm ms-2";
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", () => {

                    basket.removeChild(listItem);

                    total -= itemPrice;
                    totalElement.textContent = total.toFixed(2);

                    if (basket.children.length === 0) {
                        emptyMessage.style.display = "block";
                    }
                });
                listItem.appendChild(removeButton);

                basket.appendChild(listItem);

                total += itemPrice;
                totalElement.textContent = total.toFixed(2);
            });
        });
    }

    // Add Card Details
    if (cardForm) {
        cardForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("cardName").value.trim();
            const numberInput = document.getElementById("cardNumber").value.trim();
            const expiryInput = document.getElementById("cardExpiry").value.trim();

            if (!nameInput || !numberInput || !expiryInput) {
                alert("Please fill in all card details!");
                return;
            }

            if (basket.children.length === 0 || emptyMessage.style.display === "block") {
                alert("Your basket is empty. Add items before purchasing!");
                return;
            }

            const purchaseMessage = document.createElement("div");
            purchaseMessage.className = "alert alert-success mt-3";
            purchaseMessage.textContent = "Thank you for your purchase! Your order is complete.";

            basket.parentNode.insertBefore(purchaseMessage, basket.nextSibling);

            basket.innerHTML = "";
            total = 0;
            totalElement.textContent = total.toFixed(2);

            emptyMessage.style.display = "block";

            cardForm.reset();

            setTimeout(() => {
                purchaseMessage.remove();
            }, 5000);
        });
    }
});