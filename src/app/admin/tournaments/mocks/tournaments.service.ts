import { SpyObject } from './helper';
import { TournamentsService } from '../tournaments.service';
import Spy = jasmine.Spy;

export class MockTournamentsService extends SpyObject {
  getAllSpy: Spy;
  getByIdSpy: Spy;
  searchSpy: Spy;
  saveSpy: Spy;
  fakeResponse: any;

  constructor() {
    super( TournamentsService );

    this.fakeResponse = null;
    this.getAllSpy = this.spy('getAll').andReturn(this);
    this.getByIdSpy = this.spy('get').andReturn(this);
    this.searchSpy = this.spy('search').andReturn(this);
    this.saveSpy = this.spy('save').andReturn(this);
  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }
}
