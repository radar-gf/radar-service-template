import { HealthReport } from './health-report';

describe('HealthReport', () => {
  it('is up when there are no checks', () => {
    const report = HealthReport.from([]);

    expect(report.status).toBe('up');
  });

  it('is up when all checks are up', () => {
    const report = HealthReport.from([
      { name: 'postgres', critical: true, up: true },
      { name: 'redis', critical: false, up: true },
    ]);

    expect(report.status).toBe('up');
  });

  it('is degraded when only a non-critical check is down', () => {
    const report = HealthReport.from([
      { name: 'postgres', critical: true, up: true },
      { name: 'redis', critical: false, up: false },
    ]);

    expect(report.status).toBe('degraded');
  });

  it('is down when a critical check is down', () => {
    const report = HealthReport.from([
      { name: 'postgres', critical: true, up: false },
      { name: 'redis', critical: false, up: true },
    ]);

    expect(report.status).toBe('down');
  });

  it('is down when critical and non-critical checks are both down', () => {
    const report = HealthReport.from([
      { name: 'postgres', critical: true, up: false },
      { name: 'redis', critical: false, up: false },
    ]);

    expect(report.status).toBe('down');
  });
});
