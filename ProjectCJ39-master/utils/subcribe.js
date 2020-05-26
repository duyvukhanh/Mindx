let currentUserId = JSON.parse(localStorage.getItem("userId"))
let notiIcon = document.getElementsByClassName("loggedIn")[0]
let socialIcons = document.getElementsByClassName("not-loggedIn")
if (!currentUserId) {
    notiIcon.style.display = 'none'
    for (let socialIcon of socialIcons) {
        socialIcon.style.display = "block"
    }
} else {
    notiIcon.style.display = 'block'
    for (let socialIcon of socialIcons) {
        socialIcon.style.display = "none"
    }
    displayNotiBadge(currentUserId)
}

async function displayNotiBadge(currentUserId) {
    let notiBadge = 0
    await DB.collection("users").doc(currentUserId)
    .get()
    .then(function (doc) {
        let notifications = doc.data().notifications
        console.log(notifications)
        for (let noti of notifications) {
            if (!noti.isRead) {
                notiBadge += 1
            }
        }
    })
    document.getElementById("notiBadge").innerHTML = notiBadge
}

async function displayNotiCollapse() {
    let content = `
            <div class="card card-body">
                <div class="cart-header d-flex justify-content-between">
                    <div><i class="fas fa-bell"></i></div>
                    <div class="d-flex justify-content-end">Notifications <span id="collapseCartTotalPrice"> </span> </div>
                </div>
    `
    let currentUserId = JSON.parse(localStorage.getItem("userId"))
    console.log(currentUserId)
    await DB.collection("users").doc(currentUserId)
    .get()
    .then(function (doc) {
        let notifications = doc.data().notifications
        console.log(notifications)
        for (let noti of notifications) {
            if (!noti.isRead) {
                content += `
                <div class="cart-content" onclick="readNoti()">
                    <div class="cart-item d-flex flex-column unreadNoti">
                        <div class="noti-content grow-1">${noti.content} </div>
                        <div class="noti-time d-flex justify-content-end"> 22:00 22/5/2020 </div>
                    </div>
                </div>
                `
            } else {
                content += `
                <div class="cart-content">
                    <div class="cart-item d-flex flex-column readNoti">
                        <div class="noti-content grow-1">${noti.content} </div>
                        <div class="noti-time d-flex justify-content-end"> 22:00 22/5/2020 </div>
                    </div>
                </div>
                `
            }
        }
    })
    content += `
            <div class="cart-order-btn d-flex justify-content-center">
                        <button type="button" class="btn btn-dark" onclick="closeNotiCollapse()">Close</button>
                    </div>
                 </div>
            </div>
    `
    document.getElementById("notiCollapse").innerHTML = content
}

function closeNotiCollapse() {
    $('#notiCollapse').collapse("hide")
}

async function getNotiUpdate(currentUserId) {
    DB.collection("users").doc(currentUserId)
    .onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, function(doc) {
        displayNotiBadge(currentUserId)
    });

}
getNotiUpdate(currentUserId)