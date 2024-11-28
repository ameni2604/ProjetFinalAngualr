import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AdminServiceService } from '../../Service/admin-service.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
readonly adminService:AdminServiceService=inject(AdminServiceService)
  passwordForm!:FormGroup
  readonly fb:FormBuilder=inject(FormBuilder)


  readonly router:Router=inject(Router)
  ngOnInit(): void {
    this.passwordForm = this.fb.nonNullable.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
       })
      }


      onSubmit() {
        const  password=this.passwordForm.value.newPassword
        console.log(password);

        const SecondPassword=this.passwordForm.value.confirmPassword
        console.log(SecondPassword);


        if(password==SecondPassword)
        {
          const adminEmail=localStorage.getItem('CurrentAdminEmail')
          this.adminService.getAdmin().subscribe((admin=>
          {
            const ActAdmin=admin.find(a=>a.email===adminEmail)

            if(ActAdmin)
              {console.log('admin trouve',ActAdmin);
                const updatedAdmin = {
                
                  email: ActAdmin.email,
                  name: ActAdmin.name,
                  password: password,
                  id:ActAdmin.id
                };

                this.adminService.updatePassword(ActAdmin.id,updatedAdmin).subscribe(
                  (response) => {
                    console.log('Mise à jour terminée:', response);
                    alert('Mot de passe mis à jour avec succès !');

                    this.router.navigate(['/login'])
                  },)
              }


            else (password !=SecondPassword) 
            {
              alert('Les mots de passe ne correspondent pas.');
              return;
            }
          }
          
          ))
        }

        
        
        
      }
}
