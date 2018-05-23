
// function pollsRequest(e){
//     e.preventDefault();
//     $.ajax({
//         url: "/mypolls",
//         type: 'get',
//         dataType: 'json',
//         contentType: 'application/json',
//         success: function (polls_list) {
//             console.log(polls_list);
            
//             for(let i=0; i< polls_list.length; i++){
//                 let data = polls_list[i].poll[0];
//                 document.getElementById('polls_list').innerHTML += `<li>${JSON.stringify(data.option1)} OR ${JSON.stringify(data.option2)}</li>`;
//             }
//         },
//         error: function (err, status, xhr) {
//             console.log(err);
//         }
//     });
// }

// export {pollsRequest};
