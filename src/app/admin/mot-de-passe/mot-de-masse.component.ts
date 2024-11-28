import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterOutlet } from '@angular/router';
import { AdminServiceService } from '../../Service/admin-service.service';

@Component({
  selector: 'app-mot-de-masse',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet],
  templateUrl: './mot-de-masse.component.html',
  styleUrl: './mot-de-masse.component.css'
})
export class MotDeMasseComponent implements OnInit{

  passwordForm!: FormGroup;
readonly fb:FormBuilder=inject(FormBuilder)
readonly adminService:AdminServiceService=inject(AdminServiceService)
readonly router:Router=inject(Router)
  ngOnInit(): void {
  this.passwordForm = this.fb.nonNullable.group({
      email: ['', Validators.required]
     })
    }
    onSubmit(): void {
      const enteredEmail = this.passwordForm.value.email;
      console.log('Entered Email:', enteredEmail);
    
      this.adminService.getAdmin().subscribe((admins) => {
        
        console.log('Received Admins:',admins);
        const admin=admins.find(a =>a.email===enteredEmail);
        if (admin) {
          this.router.navigate(['/changePassword']);
          localStorage.setItem('CurrentAdminEmail',enteredEmail)
                } else {
          alert('Email incorrect, veuillez réessayer.');
        }
      });
    }
    
}
