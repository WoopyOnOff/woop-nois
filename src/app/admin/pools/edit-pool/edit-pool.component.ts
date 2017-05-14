import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input } from '@angular/core';

import {Pool} from '../../../models/index';
import {PoolsService} from '../pools.service';

@Component({
  selector: 'edit-pool',
  templateUrl: './edit-pool.component.html',
  styleUrls: ['./edit-pool.component.css']
})
export class EditPoolComponent implements OnInit {

  @Input('nbTeamsPerPool') nbTeamsPerPool: number;
  @Input('pool') pool: Pool;
  subscription: Subscription;

  constructor(private poolsService: PoolsService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.poolsService.updatePool(this.pool)
      .subscribe(
          (data) => {
            console.log("Updated pool : " + JSON.stringify(data));

          },
          (err) => {console.error("Erreur while updating pool : " + err)}
      );
  }

}
