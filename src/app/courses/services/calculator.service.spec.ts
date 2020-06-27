import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';

describe('CalculatorService', () => {
  let calculator: CalculatorService,
    loggerSpy: any;

  beforeEach(() => {
    console.log("calling before each");
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
    calculator = new CalculatorService(loggerSpy);
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
