export type HealthStatus = 'up' | 'degraded' | 'down';

export interface HealthCheck {
  readonly name: string;
  readonly critical: boolean;
  readonly up: boolean;
}

export class HealthReport {
  private constructor(
    readonly status: HealthStatus,
    readonly checks: readonly HealthCheck[],
  ) {}

  static from(checks: readonly HealthCheck[]): HealthReport {
    return new HealthReport(HealthReport.evaluate(checks), [...checks]);
  }

  private static evaluate(checks: readonly HealthCheck[]): HealthStatus {
    if (checks.some((check) => check.critical && !check.up)) {
      return 'down';
    }
    if (checks.some((check) => !check.up)) {
      return 'degraded';
    }
    return 'up';
  }
}
