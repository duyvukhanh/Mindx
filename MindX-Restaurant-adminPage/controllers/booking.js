let count = 1
let bookingTable = document.getElementById("booking-table-body");

DB.collection("booking").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let tr = `
                <tr>
                    <th scope="row">${count}</th>
                    <td>${doc.data().customerName}</td>
                    <td>${doc.data().customerPhoneNumber}</td>
                    <td>${doc.data().numberOfPeople}</td>
                    <td>${doc.data().timeBook}</td>
                    <td>${doc.data().status}</td>
                    <td>
                        <button type="button" class="btn btn-light" id="${"toPending-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Pending')">Pending</button>
                        <button type="button" class="btn btn-light" id="${"toConfirmed-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Confirmed')">Confirmed</button>
                        <button type="button" class="btn btn-light" id="${"toDone-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Done')">Done</button>
                        <button type="button" class="btn btn-light" id="${"toCancel-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Cancel')">Cancel</button>
                    </td>
                </tr>
        `
        bookingTable.innerHTML += tr;
        count += 1;
        idToDeactive = "to" + doc.data().status + "-" + doc.id
        document.getElementById(idToDeactive).style.display = "none";
    });
});

async function changeBookingStatus(id, status) {
    let booking = DB.collection("booking").doc(id);
    await booking.update({
        status : status
    })
    window.location.href = "booking.html"
}