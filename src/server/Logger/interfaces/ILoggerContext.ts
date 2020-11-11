import { StackFrame } from 'stacktrace-js';

export interface ILoggerContext {
  stackTrace?: StackFrame[];
}
