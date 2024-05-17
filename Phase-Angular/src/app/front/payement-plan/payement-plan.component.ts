import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Payment } from 'src/app/modele/Payment/payment.modele';
import { PaymentService } from 'src/app/shared/payment.service';

@Component({
  selector: 'app-payement-plan',
  templateUrl: './payement-plan.component.html',
  styleUrls: ['./payement-plan.component.css']
})
export class PayementPlanComponent implements OnInit {
  payement : Payment = new Payment();
  token!: string;
  currency!: string;
  contractId!: number;
  payments!: Payment[];
  constructor(private service : PaymentService, private router :ActivatedRoute) {
     this.contractId=this.router.snapshot.params['id']
  }

  ngOnInit(): void {
    
  }
  
  onSubmit() {
    this.service.createChargeplan(this.token, this.currency, this.contractId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
