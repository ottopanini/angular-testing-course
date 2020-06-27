import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

describe('CalculatorService', () => {
  let calculator: CalculatorService,
    loggerSpy: any;

  beforeEach(() => {
    console.log("calling before each");
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService, useValue: loggerSpy
        }
      ]
    });

    calculator = TestBed.get(CalculatorService);
  });

  it('should add two members', () => {
    console.log("add test");
    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two members', () => {
    console.log("subtract test");
    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
