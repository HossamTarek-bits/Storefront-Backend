/* eslint-disable require-jsdoc */

import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
  // eslint-disable-next-line class-methods-use-this
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
    new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.NONE,
      },
      customProcessors: [CustomProcessor],
    }),
);
