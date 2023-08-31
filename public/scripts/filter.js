

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('filterByPortrait')
  .addEventListener('click', function(){
    location.reload()
  })
})





// $("#filterByPortrait").click(function() {
//       // Make an AJAX request to fetch updated data
//       $.ajax({
//           url: "/",
//           method: "GET",
//           success: function(data) {
//               $("#allTheCards").html(data);
//               // how to get data into cards?
//           },
//           error: function(xhr, status, error) {
//               console.error("Error:", error);
//           }
//       });
//   });
// });
