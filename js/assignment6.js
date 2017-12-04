/*------------------------------------------------------------------------
Name       : Daniel Shapiro
Assignment : Assingment5
Date       : 11/18/2017
Class      : COMP.4610 F2018
File       : assignment5.js
Purpose    : JavaScript file to support Car Purchase Comparison Tool
------------------------------------------------------------------------*/

// function executed on page load
function pageLoad()
{
   removeOutTable();
   removePriceTable();
   removeMPGsTable();
   document.getElementById('repeat').value = "";
} // pageLoad

// function to check if value is integer
function isInt(value)
{
  if (isNaN(value))
  {
     return(false);
  }
  var x = parseFloat(value);
  return((x | 0) === x);
} // isInt

// function to make Form
function makeForm()
{
   var dbg = '';

   dbg = "\nmakeForm\n";
   document.getElementById('debug').value += dbg;

   var cols = document.getElementById("prices").value;
   var rows = document.getElementById("mgps").value;
   var repairs = document.getElementById("repairs").value;
   var insurances = document.getElementById("insurances").value;

   dbg = 'makeForm: Rows=' + rows + ' Cols=' + cols + "\n";
   document.getElementById('debug').value += dbg;

   //
   // Create priceTable
   //
   var pTable = document.getElementById("priceTable");

   var priceArray = new Array(cols+1);

   // Clears the Old priceTable
   var oldPLength = document.getElementById("priceTable").rows.length;
   for ( var i = (oldPLength-1); i >= 0; i--)
   {
       document.getElementById("priceTable").deleteRow(i);
   }

   priceArray[0] = pTable.insertRow(0);
   //var pheader=document.createElement("th");
   var phCell = priceArray[0].insertCell(0);//.appendChild(pheader);
   phCell.innerHTML = "Prices";

   for (var i = 1; i <= cols; i++)
   {
      priceArray[i] = pTable.insertRow(i);
      var pCell = priceArray[i].insertCell(0);
      var el = document.createElement('input');
      el.type   = 'text';
      el.name   = 'pTable_' + i;
      el.id     = 'pTable_' + i;
      el.size   = 10;
      el.maxlength = 12;
      el.value  = 0;
      el.addEventListener("blur", priceCheck);
      pCell.appendChild(el);
   }

   //
   // Create mpgTable
   //
   var mTable = document.getElementById("mpgTable");

   var mpgArray = new Array(rows+1);

   // Clears the Old mpgTable
   var oldMLength = document.getElementById("mpgTable").rows.length;
   for ( var i = (oldMLength-1); i >= 0; i--)
   {
       document.getElementById("mpgTable").deleteRow(i);
   }

   mpgArray[0] = mTable.insertRow(0);
   var mhCell = mpgArray[0].insertCell(0);
   mhCell.innerHTML = "MPGs";

   for (var i = 1; i <= rows; i++)
   {
      mpgArray[i] = mTable.insertRow(i);
      var mCell = mpgArray[i].insertCell(0);
      var el = document.createElement('input');
      el.type = 'text';
      el.name = 'mTable_' + i;
      el.id = 'mTable_' + i;
      el.size = 10;
      el.maxlength = 12;
      el.value = 1;
      el.addEventListener("blur", mpgCheck);
      mCell.appendChild(el);
   }

   //
   // Create repairTable
   //
   var rTable = document.getElementById("repairTable");

   var repArray = new Array(repairs+1);

   // Clears the Old repairTable
   var oldRLength = document.getElementById("repairTable").rows.length;
   for ( var i = (oldRLength-1); i >= 0; i--)
   {
       document.getElementById("repairTable").deleteRow(i);
   }

   repArray[0] = rTable.insertRow(0);
   //var pheader=document.createElement("th");
   var rhCell = repArray[0].insertCell(0);//.appendChild(pheader);
   rhCell.innerHTML = "Maintance\nCosts";

   for (var i = 1; i <= repairs; i++)
   {
      repArray[i] = rTable.insertRow(i);
      var rCell = repArray[i].insertCell(0);
      var el = document.createElement('input');
      el.type   = 'text';
      el.name   = 'rTable_' + i;
      el.id     = 'rTable_' + i;
      el.size   = 10;
      el.maxlength = 12;
      el.value  = 0;
      el.addEventListener("blur", repCheck);
      rCell.appendChild(el);
   }

   //
   // Create insuranceTable
   //
   var InTable = document.getElementById("insuranceTable");

   var InArray = new Array(insurances+1);

   // Clears the Old insuranceTable
   var oldInLength = document.getElementById("insuranceTable").rows.length;
   for ( var i = (oldInLength-1); i >= 0; i--)
   {
       document.getElementById("insuranceTable").deleteRow(i);
   }

   InArray[0] = InTable.insertRow(0);
   //var pheader=document.createElement("th");
   var InhCell = InArray[0].insertCell(0);//.appendChild(pheader);
   InhCell.innerHTML = "Insurance\nPremiums";

   for (var i = 1; i <= insurances; i++)
   {
      InArray[i] = InTable.insertRow(i);
      var InCell = InArray[i].insertCell(0);
      var el = document.createElement('input');
      el.type   = 'text';
      el.name   = 'InTable_' + i;
      el.id     = 'InTable_' + i;
      el.size   = 10;
      el.maxlength = 12;
      el.value  = 0;
      el.addEventListener("blur", InCheck);
      InCell.appendChild(el);
   }

   removeOutTable();

   document.getElementById('repeat').value = "";

   return(0);
} // makeForm

$(document).ready(function(){ $("#years").blur(procYears); });
$(document).ready(function(){ $("#interest").blur(procInterest); });
$(document).ready(function(){ $("#mlYear").blur(procMlYear); });
$(document).ready(function(){ $("#prGal").blur(procPrGal); });
$(document).ready(function(){ $("#prices").blur(procPrices); });
$(document).ready(function(){ $("#mgps").blur(procMPGs); });

// function to process Years input
function procYears()
{
   var years = document.getElementById("years").value;
   if ((!(isInt(years))) || (years < 0))
   {
      document.getElementById("years").value = 0;
      $("#yearsSD" ).slider("value", 0);
      alert("Years <" + years + "> must be positive integer");
   }
   else
   {
      document.getElementById('repeat').value = "";
      if (document.getElementById("outTable").rows.length != 0)
      {
         removeOutTable();
      }
      $("#yearsSD" ).slider("value", years);
   }
   return(years);
} // procYears

// function to process Interest Rate input
function procInterest()
{
   var interest = document.getElementById("interest").value;
   if ((!(interest == parseFloat(interest))) || (interest <= 0))
   {
      document.getElementById("interest").value = 1;
      $("#interestSD" ).slider("value", 1);
      alert("Interest Rate <" + interest + "> must be valid");
   }
   else
   {
      document.getElementById('repeat').value = "";
      if (document.getElementById("outTable").rows.length != 0)
      {
         removeOutTable();
      }
      $("#interestSD" ).slider("value", interest);
   }
   return(interest);
} // procInterest

// function to process Miles per Year input
function procMlYear()
{
   var ml = document.getElementById("mlYear").value;
   if ((!(isInt(ml))) || (ml < 0))
   {
      document.getElementById("mlYear").value = 1;
      $("#mlYearSD" ).slider("value", 1);
      alert("Miles per year <" + ml + "> must be positive integer");
   }
   else
   {
      document.getElementById('repeat').value = "";
      if (document.getElementById("outTable").rows.length != 0)
      {
         removeOutTable();
      }
      $("#mlYearSD" ).slider("value", ml);
   }
   return(ml);
} // procMlYear

// function to process Price per Gallon input
function procPrGal()
{
   document.getElementById('debug').value += "procPrGal";
   var prg = document.getElementById("prGal").value;
   if ((!(prg == parseFloat(prg))) || (prg < 0))
   {
      document.getElementById("prGal").value = 1;
      $("#prGalSD" ).slider("value", 1);
      alert("Price per gallon <" + prg + "> must be valid");
   }
   else
   {
      document.getElementById('repeat').value = "";
      if (document.getElementById("outTable").rows.length != 0)
      {
         removeOutTable();
      }
      $("#prGalSD" ).slider("value", prg);
   }
   return(prg);
} // procPrGal

// function to process Number of Prices input
function procPrices()
{
   removeOutTable();
   removePriceTable();
   document.getElementById('repeat').value = "";
   var prices = document.getElementById("prices").value;
   if ((!(isInt(prices))) || (prices < 0))
   {
      document.getElementById("prices").value = 1;
      alert("Number of prices <" + prices + "> must be positive integer");
   }
   return(prices);
} // procPrices

// function to process Number of MPG input
function procMPGs()
{
   removeOutTable();
   removeMPGsTable();
   document.getElementById('repeat').value = "";
   var mgps = document.getElementById("mgps").value;
   if ((!(isInt(mgps))) || (mgps <= 0))
   {
      document.getElementById("mgps").value = 1;
      alert("Number of MPGs <" + mgps + "> must be positive integer");
   }  
   return(mgps);
} // procMPGs

// function to process Number of Repair costs input
function procRepairs()
{
   removeOutTable();
   removeRepTable();
   document.getElementById('repeat').value = "";
   var repairs = document.getElementById("repairs").value;
   if ((!(isInt(repairs))) || (repairs < 0))
   {
      document.getElementById("repairs").value = 1;
      alert("Number of Maintance costs <" + repairs + 
            "> must be positive integer");
   }  
   return(repairs);
} // procRepairs

// function to process Number of MPG input
function procInsurances()
{
   removeOutTable();
   removeInTable();
   document.getElementById('repeat').value = "";
   var insurances = document.getElementById("insurances").value;
   if ((!(isInt(insurances))) || (insurances < 0))
   {
      document.getElementById("insurances").value = 1;
      alert("Number of Insurance Premiums <" + insurances + 
            "> must be positive integer");
   }  
   return(insurances);
} // procInsurances

// function to check Price
function priceCheck()
{  
   document.getElementById('repeat').value = "";
   var cols = document.getElementById("prices").value;
   for (var i = 1; i <= cols; i++)
   {
      var price = document.getElementById("pTable_" + i).value;
      if ((isInt(price)) && (price >= 0))
      {
         document.getElementById('debug').value += "\n" + i + ":" + price;
      }
      else
      {
         document.getElementById("pTable_" + i).value = 0;
         alert("Price [" + i + "] <" + price + "> is NOT an integer");
         return(false);
      }
   }
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(true);
} // priceCheck

/*
// function to check MPG
*/
function mpgCheck()
{  
   document.getElementById('repeat').value = "";
   var rows = document.getElementById("mgps").value;
   for (var i = 1; i <= rows; i++)
   {
      var mpg = document.getElementById("mTable_" + i).value;
      if ((isInt(mpg)) && (mpg > 0))
      {
         document.getElementById('debug').value += "\n" + i + ":" + mpg;
      }
      else
      {
         document.getElementById("mTable_" + i).value = 1;
         alert("MPG [" + i + "] <" + mpg + "> is NOT an integer");
         return(false);
      }
   }
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(true);
} // mpgCheck

/*
// function to check Repairs
*/
function repCheck()
{  
   document.getElementById('repeat').value = "";
   var rows = document.getElementById("repairs").value;
   for (var i = 1; i <= rows; i++)
   {
      var repair = document.getElementById("rTable_" + i).value;
      if ((isInt(repair)) && (repair >= 0))
      {
         document.getElementById('debug').value += "\n" + i + ":" + repair;
      }
      else
      {
         document.getElementById("rTable_" + i).value = 0;
         alert("Maintance Cost [" + i + "] <" + repair + "> is NOT an integer");
         return(false);
      }
   }
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(true);
} // repCheck

/*
// function to check Insurances
*/
function InCheck()
{  
   document.getElementById('repeat').value = "";
   var rows = document.getElementById("insurances").value;
   for (var i = 1; i <= rows; i++)
   {
      var insurance = document.getElementById("InTable_" + i).value;
      if ((isInt(insurance)) && (insurance >= 0))
      {
         document.getElementById('debug').value += "\n" + i + ":" + insurance;
      }
      else
      {
         document.getElementById("InTable_" + i).value = 0;
         alert("Insurance Premiums [" + i + "] <" + insurance + 
               "> is NOT an integer");
         return(false);
      }
   }
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(true);
} // InCheck

// function to check data
function verifyData()
{
   var text = '';

   // Common Options
   text += "DATA PRINTED FOR VALIDATION ONLY:\n";
   text += 'Years           :' + document.getElementById('years').value;
   text += '\nInterest Rate   :' + document.getElementById('interest').value;
   text += '\nMiles Per Year  :' + document.getElementById('mlYear').value;
   text += '\nPrice Per Gallon:' + document.getElementById('prGal').value;

   // Prices
   var cols = document.getElementById("prices").value;
   text += '\n\nPrices( ' + cols + ' ): ';
   for (var i = 1; i <= cols; i++)
   {
      text += document.getElementById('pTable_' + i).value + ' '
   }

   // MPGs
   var rows = document.getElementById("mgps").value;
   text += '\n\nMPGs( ' + rows + ' )  : ';
   for (var i = 1; i <= rows; i++)
   {
      text += document.getElementById('mTable_' + i).value + ' '
   }

   // Repairs
   var repairs = document.getElementById("repairs").value;
   text += '\n\nMaintence Costs( ' + repairs + ' ): ';
   for (var i = 1; i <= repairs; i++)
   {
      text += document.getElementById('rTable_' + i).value + ' '
   }

   // Insurances
   var insurance = document.getElementById("insurances").value;
   text += '\n\nInsurance Premiums( ' + insurance + ' ): ';
   for (var i = 1; i <= insurance; i++)
   {
      text += document.getElementById('InTable_' + i).value + ' '
   }

   // Insert text to repeat
   document.getElementById('repeat').value = text;

   return(true);
} // verifyData

//function to remove Output Table
function removeOutTable()
{
   // Clears the Old outTable
   var oldLength = document.getElementById("outTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("outTable").deleteRow(i);
   }

   // Clears the Old prVrepTable
   oldLength = document.getElementById("prVrepTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("prVrepTable").deleteRow(i);
   }

   // Clears the Old prVinTable
   oldLength = document.getElementById("prVinTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("prVinTable").deleteRow(i);
   }
}

//function to remove Price Table
function removePriceTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("priceTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("priceTable").deleteRow(i);
   }
}

//function to remove MPGs Table
function removeMPGsTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("mpgTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("mpgTable").deleteRow(i);
   }
}

//function to remove Repair Table
function removeRepTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("repairTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("repairTable").deleteRow(i);
   }
}

//function to remove Insurance Table
function removeInTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("insuranceTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("insuranceTable").deleteRow(i);
   }
}

//function to make table
function makeOutTable()
{
   //
   // Price vs MPG output table
   //
   var cols = document.getElementById("prices").value;
   var rows = document.getElementById("mgps").value;
   var dbg = '';

   dbg = 'Rows=' + rows + ' Cols=' + cols + "\n";
   document.getElementById('debug').value += dbg; 

   var tableArray = new Array(rows+1);

   // Get the table
   var table = document.getElementById("outTable");

   removeOutTable();

   tableArray[0] = table.insertRow(0);
   var tblNameCell = tableArray[0].insertCell(0);
   tblNameCell.innerHTML = "Price/Fuel Comsumption";

   for (var i = 1; i <= cols; i++)
   {
      var price = parseFloat(document.getElementById('pTable_' + i).value);
      var cell = tableArray[0].insertCell(i);
      cell.innerHTML = "Price " + i + " ($" + price.toFixed(0) + ")";
   }

   var months = document.getElementById('years').value * 12;
   var interest = parseFloat(document.getElementById('interest').value);
   interest = interest / 100 / 12;
   var mlYears = document.getElementById('mlYear').value;
   var prGal = document.getElementById('prGal').value;

   var lowest = new Array(3);  // [0] - cost [1] - row/i  [2] - cols/j
   var highest = new Array(3); // [0] - cost [1] - row/i  [2] - cols/j

   lowest[0] = 1000000;
   lowest[1] = 1;
   lowest[2] = 1;
   highest[0] = 0;
   highest[1] = 1;
   highest[2] = 1;


   for (var i = 1; i <= rows; i++)
   {
      tableArray[i] = table.insertRow(i);
      var hCell = tableArray[i].insertCell(0);
      var mpg = parseFloat(document.getElementById('mTable_' + i).value);
      hCell.innerHTML = "MPG " + i + " (" + mpg.toFixed(2) + ")";
      for (var j = 1; j <= cols; j++)
      {
         // Calculate Cost per month
         var price = parseFloat(document.getElementById('pTable_' + j).value);

         // compute the monthly payment figure
         var x = Math.pow(1 + interest, months); //Math.pow computes powers
         var monthly = (price*x*interest)/(x-1);

         var cell = tableArray[i].insertCell(j);
         var pmo = document.createElement('output');
         pmo.type = 'text';
         pmo.name = 'pmo_' + i + '_' + j;
         pmo.id = 'pmo_' + i + '_' + j;
         pmo.size = 20;
         pmo.maxlength = 20;
         pmo.value = '$' + monthly.toFixed(2) + ' /mo';
         cell.appendChild(pmo);
         cell.appendChild(document.createElement('BR'));

         // Calculate Cost per Mile
         var pml = document.createElement('output');
         pml.type = 'text';
         pml.name = 'pml_' + i + '_' + j;
         pml.id = 'pml_' + i + '_' + j;
         pml.size = 20;
         pml.maxlength = 20;
         pml.value = '$' + (prGal/mpg).toFixed(2) + ' /ml';
         cell.appendChild(pml);
         cell.appendChild(document.createElement('BR'));

         // Calculate Total Cost per Month
         var tot = document.createElement('output');
         tot.type = 'text';
         tot.name = 'tab_' + i + '_' + j;
         tot.id = 'tab_' + i + '_' + j;
         tot.size = 20;
         tot.maxlength = 20;
         var cost = (monthly + (prGal/mpg) * (mlYears/12));
         tot.value = '$' + cost.toFixed(2);
         cell.appendChild(tot);

         if (highest[0] < cost)
         {
            highest[0] = cost;
            if (document.getElementById('tab_' + highest[1] + '_' + highest[2]).style.color == "red")
            {
               document.getElementById('tab_' + highest[1] + '_' + highest[2]).style.color = "white";
            }
            highest[1] = i;
            highest[2] = j
            tot.style.color = "red";
         }
         if (lowest[0] >= cost)
         {
            lowest[0] = cost;
            if (document.getElementById('tab_' + lowest[1] + '_' + lowest[2]).style.color == "green")
            {
               document.getElementById('tab_' + lowest[1] + '_' + lowest[2]).style.color = "white";
            }
            lowest[1] = i;
            lowest[2] = j;
            tot.style.color = "green";
         }
      }
   }

   //
   // Price vs Repair costs output table
   //
   rows = document.getElementById("repairs").value;

   var pVrArray = new Array(rows+1);

   // Get the table
   var pVrtable = document.getElementById("prVrepTable");

   pVrtable[0] = pVrtable.insertRow(0);
   var pVrNameCell = pVrtable[0].insertCell(0);
   pVrNameCell.innerHTML = "Price/Maintance costs";

   lowest[0] = 1000000;
   lowest[1] = 1;
   lowest[2] = 1;
   highest[0] = 0;
   highest[1] = 1;
   highest[2] = 1;

   for (var i = 1; i <= cols; i++)
   {
      var price = parseFloat(document.getElementById('pTable_' + i).value);
      var cell = pVrtable[0].insertCell(i);
      cell.innerHTML = "Price " + i + " ($" + price.toFixed(0) + ")";
   }

   for (var i = 1; i <= rows; i++)
   {
      pVrtable[i] = pVrtable.insertRow(i);
      var hCell = pVrtable[i].insertCell(0);
      var rep = parseFloat(document.getElementById('rTable_' + i).value);
      hCell.innerHTML = "Maintance Cost " + i + " (" + rep.toFixed(2) + ")";
   
      for (var j = 1; j <= cols; j++)
      {
         // Calculate Cost per month
         var price = parseFloat(document.getElementById('pTable_' + j).value);

         // compute the monthly payment figure
         var x = Math.pow(1 + interest, months); //Math.pow computes powers
         var monthly = (price*x*interest)/(x-1);

         var cell = pVrtable[i].insertCell(j);
         var pmo = document.createElement('output');
         pmo.type = 'text';
         pmo.name = 'pmor_' + i + '_' + j;
         pmo.id = 'pmor_' + i + '_' + j;
         pmo.size = 20;
         pmo.maxlength = 20;
         pmo.value = '$' + monthly.toFixed(2) + ' /mo';
         cell.appendChild(pmo);
         cell.appendChild(document.createElement('BR'));

         // Calculate Cost per Mile
         var prep = document.createElement('output');
         prep.type = 'text';
         prep.name = 'prep_' + i + '_' + j;
         prep.id = 'prep_' + i + '_' + j;
         prep.size = 20;
         prep.maxlength = 20;
         prep.value = '$' + rep.toFixed(2) + ' /mo';
         cell.appendChild(prep);
         cell.appendChild(document.createElement('BR'));

         // Calculate Total Cost per Month
         var tot = document.createElement('output');
         tot.type = 'text';
         tot.name = 'tabr_' + i + '_' + j;
         tot.id = 'tabr_' + i + '_' + j;
         tot.size = 20;
         tot.maxlength = 20;
         var cost = (monthly + rep);
         tot.value = '$' + cost.toFixed(2);
         cell.appendChild(tot);

         if (highest[0] < cost)
         {
            highest[0] = cost;
            if (document.getElementById('tabr_' + highest[1] + '_' + highest[2]).style.color == "red")
            {
               document.getElementById('tabr_' + highest[1] + '_' + highest[2]).style.color = "white";
            }
            highest[1] = i;
            highest[2] = j
            tot.style.color = "red";
         }
         if (lowest[0] >= cost)
         {
            lowest[0] = cost;
            if (document.getElementById('tabr_' + lowest[1] + '_' + lowest[2]).style.color == "green")
            {
               document.getElementById('tabr_' + lowest[1] + '_' + lowest[2]).style.color = "white";
            }
            lowest[1] = i;
            lowest[2] = j;
            tot.style.color = "green";
         }
      }
   }

   //
   // Price vs Insurance costs output table
   //
   rows = document.getElementById("insurances").value;

   var pVinArray = new Array(rows+1);

   // Get the table
   var pVintable = document.getElementById("prVinTable");

   pVinArray[0] = pVintable.insertRow(0);
   var pVinNameCell = pVinArray[0].insertCell(0);
   pVinNameCell.innerHTML = "Price/Insurance Premium";

   lowest[0] = 1000000;
   lowest[1] = 1;
   lowest[2] = 1;
   highest[0] = 0;
   highest[1] = 1;
   highest[2] = 1;

   for (var i = 1; i <= cols; i++)
   {
      var price = parseFloat(document.getElementById('pTable_' + i).value);
      var cell = pVinArray[0].insertCell(i);
      cell.innerHTML = "Price " + i + " ($" + price.toFixed(0) + ")";
   }

   for (var i = 1; i <= rows; i++)
   {
      pVinArray[i] = pVintable.insertRow(i);
      var hCell = pVinArray[i].insertCell(0);
      var ins = parseFloat(document.getElementById('InTable_' + i).value);
      hCell.innerHTML = "Insurance Premium " + i + " (" + rep.toFixed(2) + ")";

      for (var j = 1; j <= cols; j++)
      {
         // Calculate Cost per month
         var price = parseFloat(document.getElementById('pTable_' + j).value);

         // compute the monthly payment figure
         var x = Math.pow(1 + interest, months); //Math.pow computes powers
         var monthly = (price*x*interest)/(x-1);

         var cell = pVinArray[i].insertCell(j);
         var pmo = document.createElement('output');
         pmo.type = 'text';
         pmo.name = 'pmoin_' + i + '_' + j;
         pmo.id = 'pmoin_' + i + '_' + j;
         pmo.size = 20;
         pmo.maxlength = 20;
         pmo.value = '$' + monthly.toFixed(2) + ' /mo';
         cell.appendChild(pmo);
         cell.appendChild(document.createElement('BR'));

         // Calculate Cost per Mile
         var pins = document.createElement('output');
         pins.type = 'text';
         pins.name = 'prep_' + i + '_' + j;
         pins.id = 'prep_' + i + '_' + j;
         pins.size = 20;
         pins.maxlength = 20;
         pins.value = '$' + ins.toFixed(2) + ' /mo';
         cell.appendChild(pins);
         cell.appendChild(document.createElement('BR'));

         // Calculate Total Cost per Month
         var tot = document.createElement('output');
         tot.type = 'text';
         tot.name = 'tabin_' + i + '_' + j;
         tot.id = 'tabin_' + i + '_' + j;
         tot.size = 20;
         tot.maxlength = 20;
         var cost = (monthly + ins);
         tot.value = '$' + cost.toFixed(2);
         cell.appendChild(tot);

         if (highest[0] < cost)
         {
            highest[0] = cost;
            if (document.getElementById('tabin_' + highest[1] + '_' + highest[2]).style.color == "red")
            {
               document.getElementById('tabin_' + highest[1] + '_' + highest[2]).style.color = "white";
            }
            highest[1] = i;
            highest[2] = j
            tot.style.color = "red";
         }
         if (lowest[0] >= cost)
         {
            lowest[0] = cost;
            if (document.getElementById('tabin_' + lowest[1] + '_' + lowest[2]).style.color == "green")
            {
               document.getElementById('tabin_' + lowest[1] + '_' + lowest[2]).style.color = "white";
            }
            lowest[1] = i;
            lowest[2] = j;
            tot.style.color = "green";
         }
      }
   }

   return(true);
} // makeOutTable

function openTable(evt, table) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(table).style.display = "block";
    evt.currentTarget.className += " active";
} 
