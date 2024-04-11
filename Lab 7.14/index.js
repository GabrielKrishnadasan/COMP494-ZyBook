function parseScores(scoresString) {
   // TODO: Compete the function
   return scoresString.split(" ");
}

function buildDistributionArray(scoresArray) {
   // TODO: Compete the function
   var ret = [0, 0, 0, 0, 0];

   for(i = 0; i < scoresArray.length; i++) {
      let score = scoresArray[i];

      if (score >= 90) {
         ret[0]++;
      } else {
         if (score >= 80) {
            ret[1]++;
         } else {
            if (score >= 70) {
               ret[2]++;
            } else {
               if (score >= 60) {
                  ret[3]++;
               } else {
                  ret[4]++
               }
            }
         }
      }
      return ret;
   }
}

function setTableContent(userInput) {
   // TODO: Compete the function
   var distArray = buildDistributionArray(parseScores(userInput));
   var firstRow = document.getElementsById("firstRow")[0];
   var thirdRow = document.getElementById("thirdRow")[0];

   for (i = 0; i < 5; i++) {
      var td = document.createElement("td");

      var div = document.createElement("div");
      div.style = `height:${distArray * 10}px`;
      div.className = `bar${i}`;

      td.appendChild(div);
      
      firstRow.appendChild(td);

      var td2 = document.createElement("td");
      td2.textContent = `${distArray[i]}`;
      thirdRow.appendChild(td2);
   }
}

// The argument can be changed for testing purposes
setTableContent("45 78 98 83 86 99 90 59");