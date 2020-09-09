$(document).ready(function(){
	var firebaseConfig = {
    apiKey: "AIzaSyBW3n7dfeuMfVHuaCSAnlEui9lCc582Dlc",
    authDomain: "expense-afa14.firebaseapp.com",
    databaseURL: "https://expense-afa14.firebaseio.com",
    projectId: "expense-afa14",
    storageBucket: "expense-afa14.appspot.com",
    messagingSenderId: "521203262272",
    appId: "1:521203262272:web:de613d06f38f223cc950a5"
    };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  	let expense = firebase.database().ref('expense')
  	expense.on('value',function(snapshot){
  	let data = snapshot.val();
  	let count=1;
  	let count1=1;
  	let totalBalance=0;
  	$('#totalBalance').html('');
  	$('#debittable').html('');
  	let totalDebitAmount=0;
  	for(let key in data){
  		if(data[key].expensetype === "Debit"){
  			let debitAmount=data[key].amount;
  			$('#debittable').append(`
  				<tr>
				      <th scope="row">${count}</th>
				      <td>${data[key].expensename}</td>
				      <td>${data[key].expensetype}</td>
				      <td>${data[key].amount}</td>
				      <td>${data[key].date}</td>
				      <td>${data[key].category}</td>
				      <td><button data-id="${key}" class="btn btn-danger delete">Delete</button></td>
				      <td><button data-id="${key}" type="button" class="btn btn-primary display" data-toggle="modal" data-target="#exampleModalCenter">Edit</button></td>
				  </tr>
  			`);
  			count++;
  			totalDebitAmount+=parseInt(debitAmount);
  		};
  		};
  	$('#credittable').html('');
  	let totalCreditAmount=0; 
  		for(let key in data){
  			if(data[key].expensetype === "Credit"){
  				let creditAmount = data[key].amount;
  				$('#credittable').append(`
  						<tr>
					      <th scope="row">${count1}</th>
					      <td>${data[key].expensename}</td>
					      <td>${data[key].expensetype}</td>
					      <td>${data[key].amount}</td>
					      <td>${data[key].date}</td>
					      <td>${data[key].category}</td>
					      <td><button data-id="${key}" class="btn btn-danger delete">Delete</button></td>
					      <td><button data-id="${key}" type="button" class="btn btn-primary display" data-toggle="modal" data-target="#exampleModalCenter">Edit</button></td>
					    </tr>
  					`);
  				count1++;
  				totalCreditAmount+=parseInt(creditAmount);
  			};					
  		};
  		totalBalance = totalCreditAmount - totalDebitAmount;
		  $('#totalBalance').append(`
					<h4>Rs.   <span>${totalBalance}</span></h4>
				`);
		  $('#debittable').on('click','.display',function(){
  			let taskId =$(this).data("id");
  			$('#expenseModal').html(`
  					<label class="font-weight-bold">Expense Name:</label><br>
				        <input type="text" name="" value="${data[taskId].expensename}" required class="form-control expenseName"><br>
				        <label class="font-weight-bold">Expense Type</label><br>
				        <select id="expenseType" class="form-control expenseType" required>
								<option>Debit</option>
								<option>Credit</option>
						</select><br>
						<label class="font-weight-bold">Amount:</label><br>
						<input type="number" name="" value="${data[taskId].amount}" class="form-control amount" required="" id="amount"><br>
						<label class="font-weight-bold">Date:</label><br>
						<input type="date" value="${data[taskId].date}" name="" id="date" required class="form-control date"><br>
						<label for="category" class="font-weight-bold">Category:</label><br>
						<select id="category" class="form-control category" required>
								<option value="">Category</option>								
								<option value="Electric Bill">Electric Bill</option>								
								<option value="Internet Bill">Internet Bill</option>
								<option value="Telephone Bill">Telephone Bill</option>
								<option value="Salary">Salary</option>
								<option value="Grossary">Grossary</option>
								<option value="Gas">Gas Booking</option>
								<option value="Other">Others</option>
						</select><br>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        				<button type="submit" data-id="${taskId}" class="btn btn-primary update">Save changes</button>
  				`);
  		});
		$('#credittable').on('click','.display',function(){
  			let taskId =$(this).data("id");
  			$('#expenseModal').html(`
  					<label class="font-weight-bold">Expense Name:</label><br>
				        <input type="text" name="" value="${data[taskId].expensename}" required class="form-control expenseName"><br>
				        <label class="font-weight-bold">Expense Type</label><br>
				        <select id="expenseType" class="form-control expenseType" required>
				        		<option>Credit</option>
								<option>Debit</option>							
						</select><br>
						<label class="font-weight-bold">Amount:</label><br>
						<input type="number" name="" value="${data[taskId].amount}" class="form-control amount" required="" ><br>
						<label class="font-weight-bold">Date:</label><br>
						<input type="date" value="${data[taskId].date}" name="" id="date" required class="form-control date"><br>
						<label for="category" class="font-weight-bold">Category:</label><br>
						<select id="category" class="form-control category" required>
								<option value="">Category</option>								
								<option value="Electric Bill">Electric Bill</option>								
								<option value="Internet Bill">Internet Bill</option>
								<option value="Telephone Bill">Telephone Bill</option>
								<option value="Salary">Salary</option>
								<option value="Grossary">Grossary</option>
								<option value="Gas">Gas Booking</option>
								<option value="Other">Others</option>
						</select><br>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        				<button type="button" data-id="${taskId}" class="btn btn-warning update">Save</button>
  				`);
  		});  
  	 });
		$('#expenseModal').on('click','.update',function(){			
			let expenseName = $('.expenseName').val();
			let expenseType = $('.expenseType').val();
			let amount = $('.amount').val();
			let category = $('.category').val();
			let date = $('.date').val();
			let updateId = $(this).data("id");
			firebase.database().ref('expense/' + updateId).update({
				expensename : expenseName,
		  		expensetype : expenseType,
		  		amount : amount,
		  		date : date,
		  		category :category
			});
		})		
  		$('#debittable').on('click','.delete',function(){
  			let taskId = $(this).data("id");
  			firebase.database().ref('expense/' + taskId).remove();
  		});
  		$('#credittable').on('click','.delete',function(){
  			let taskId = $(this).data("id");
  			firebase.database().ref('expense/' + taskId).remove();
  		});
	$('#submit').click(function(){
		let expenseName = $('#expenseName').val();
		let expenseType = $('#expenseType').val();
		let amount = $('#amount').val();
		let category = $('#category').val();
		let date = $('#date').val();		
		let expenseRef = expense.push({
		  	expensename : expenseName,
		  	expensetype : expenseType,
		  	amount : amount,
		  	date : date,
		  	category :category
		});
	})
})