/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmationStatusService } from './confirmationStatus.service';

describe('Service: ConfirmationStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationStatusService]
    });
  });

  it('should ...', inject([ConfirmationStatusService], (service: ConfirmationStatusService) => {
    expect(service).toBeTruthy();
  }));
});
