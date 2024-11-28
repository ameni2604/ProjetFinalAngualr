import { Component, inject, OnInit } from '@angular/core';
import { Route, Router, RouterLink , RouterOutlet} from '@angular/router';
import { AdminServiceService } from '../../Service/admin-service.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit{
  readonly adminService:AdminServiceService=inject(AdminServiceService)

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe(data=>data.forEach(admin=>
      {console.log("hedha name:"+admin.name)
      console.log("hedha email:"+admin.email)
      console.log("hedha password:"+admin.password)

      }
    ))

  }




}
