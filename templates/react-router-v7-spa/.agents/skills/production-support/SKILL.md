---
name: production-support
description: Handles production issues, monitoring, incident response, and operational excellence. Expert in debugging production problems and maintaining system reliability.
---

# Production Support Engineering

Ensure system reliability, monitor production health, respond to incidents, and maintain operational excellence.

## When to Use

Use this skill when you need to:
- Respond to production incidents
- Investigate production issues
- Set up monitoring and alerts
- Analyze logs and metrics
- Optimize production performance
- Improve system reliability

## Incident Response Process

### 1. Detection
- Monitor alerts and dashboards
- Check error tracking systems
- Review user reports
- Analyze metrics anomalies

### 2. Triage
- Assess severity and impact
- Determine affected users/features
- Identify if issue is ongoing
- Classify incident priority

**Severity Levels:**
- **P0 (Critical)**: Complete outage, all users affected
- **P1 (High)**: Major feature broken, many users affected
- **P2 (Medium)**: Minor feature broken, some users affected
- **P3 (Low)**: Cosmetic issue, minimal impact

### 3. Investigation
```bash
# Check application logs
kubectl logs -f deployment/app-name --tail=100

# Check error rates
# View in Sentry/DataDog/New Relic dashboard

# Check database connection
# Monitor connection pool status

# Check external services
# Verify third-party API status
```

### 4. Mitigation
- Apply immediate fix or workaround
- Roll back to previous version if needed
- Scale resources if needed
- Disable problematic feature

### 5. Resolution
- Implement permanent fix
- Verify fix in production
- Monitor for recurrence
- Update runbooks

### 6. Post-Incident
- Write incident report
- Conduct blameless postmortem
- Identify root cause
- Create action items
- Update documentation

## Monitoring Setup

### Application Monitoring
```typescript
// Web Vitals Tracking
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Send to your analytics platform
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body);
  } else {
    fetch('/api/vitals', { body, method: 'POST', keepalive: true });
  }
}

export function initMonitoring() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

### Error Tracking
```typescript
// Sentry Integration
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  
  // Performance monitoring
  tracesSampleRate: 0.1,
  
  // Session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Release tracking
  release: `app@${import.meta.env.VITE_APP_VERSION}`,
  
  // Error filtering
  beforeSend(event, hint) {
    // Filter out known errors
    if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
      return null;
    }
    return event;
  },
});

// Custom error context
Sentry.setUser({
  id: user.id,
  email: user.email,
});

Sentry.setContext('feature', {
  name: 'user-profile',
  version: '2.0',
});

// Capture exceptions manually
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'user-profile' },
    extra: { userId: user.id },
  });
}
```

### Health Checks
```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.query('SELECT 1');
    
    // Check external services
    const apiStatus = await checkExternalAPI();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'ok',
        externalAPI: apiStatus ? 'ok' : 'degraded',
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});

// Readiness check (for k8s)
app.get('/ready', async (req, res) => {
  // Check if app is ready to receive traffic
  const isReady = await checkApplicationReadiness();
  
  if (isReady) {
    res.status(200).send('Ready');
  } else {
    res.status(503).send('Not ready');
  }
});
```

## Log Analysis

### Structured Logging
```typescript
// Logger utility
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Usage
logger.info({ userId: '123' }, 'User logged in');
logger.error({ error, userId: '123' }, 'Failed to fetch user data');

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    logger.info({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: Date.now() - start,
      userId: req.user?.id,
    }, 'HTTP request');
  });
  
  next();
});
```

### Log Aggregation
```bash
# Query logs with kubectl
kubectl logs -l app=myapp --tail=100 -f

# Query with grep
kubectl logs deployment/myapp | grep "ERROR"

# Export logs for analysis
kubectl logs deployment/myapp --since=1h > logs.txt

# View logs in Datadog
# Use Datadog query language
status:error service:myapp @userId:123

# View logs in CloudWatch
# Use CloudWatch Insights query
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 100
```

## Performance Optimization

### Database Query Optimization
```typescript
// Add indexes for frequently queried fields
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);

// Use connection pooling
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Optimize queries
// ❌ Bad: N+1 query problem
for (const post of posts) {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [post.userId]);
  post.user = user;
}

// ✅ Good: Batch query
const userIds = posts.map(p => p.userId);
const users = await db.query('SELECT * FROM users WHERE id = ANY($1)', [userIds]);
const userMap = new Map(users.map(u => [u.id, u]));
posts.forEach(p => p.user = userMap.get(p.userId));
```

### Caching Strategy
```typescript
// Redis caching
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function getCachedUser(userId: string): Promise<User> {
  // Check cache first
  const cached = await redis.get(`user:${userId}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const user = await db.getUserById(userId);
  
  // Cache for 1 hour
  await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  
  return user;
}

// Cache invalidation
async function updateUser(userId: string, data: Partial<User>) {
  await db.updateUser(userId, data);
  
  // Invalidate cache
  await redis.del(`user:${userId}`);
}
```

### CDN Configuration
```typescript
// Cache-Control headers
app.use((req, res, next) => {
  // Static assets: cache for 1 year
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff2?)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // HTML: revalidate
  else if (req.path.match(/\.html$/)) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  // API: no cache
  else if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  
  next();
});
```

## Alerting Rules

### Define Alert Thresholds
```yaml
# prometheus-alerts.yml
groups:
  - name: application
    rules:
      # Error rate alert
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }}% over 5 minutes"

      # Latency alert
      - alert: HighLatency
        expr: histogram_quantile(0.95, http_request_duration_seconds_bucket) > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "P95 latency is {{ $value }}s"

      # Memory alert
      - alert: HighMemoryUsage
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value }}%"
```

### Alert Response Runbooks
```markdown
## High Error Rate Alert

### Symptoms
- Error rate above 5% for 5+ minutes
- Users reporting 500 errors
- Sentry showing increased exceptions

### Investigation Steps
1. Check Sentry for error patterns
2. Review recent deployments
3. Check external service status
4. Analyze error logs
5. Check database connections

### Mitigation
- Roll back recent deployment if applicable
- Scale up instances if load-related
- Disable problematic feature flag
- Contact external service provider

### Resolution
- Fix underlying issue
- Deploy patch
- Monitor error rate
- Update documentation
```

## Disaster Recovery

### Backup Strategy
```bash
# Database backups
# Daily full backup + hourly incremental
0 2 * * * /usr/local/bin/backup-db.sh

# Verify backup integrity
*/30 * * * * /usr/local/bin/verify-backup.sh

# Off-site backup replication
0 3 * * * /usr/local/bin/replicate-backup.sh
```

### Rollback Procedures
```bash
# Roll back to previous version
kubectl rollout undo deployment/app-name

# Roll back to specific revision
kubectl rollout undo deployment/app-name --to-revision=2

# Check rollout status
kubectl rollout status deployment/app-name

# Verify deployment health
kubectl get pods -l app=app-name
```

## Capacity Planning

### Resource Monitoring
- CPU usage trends
- Memory usage trends
- Disk space usage
- Network bandwidth
- Database connections
- API rate limits

### Scaling Strategy
```typescript
// Horizontal Pod Autoscaler (k8s)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-name
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

## On-Call Procedures

### On-Call Checklist
- [ ] Access to monitoring dashboards
- [ ] Access to error tracking (Sentry)
- [ ] Access to logging (CloudWatch/Datadog)
- [ ] Access to deployment tools
- [ ] Access to database (read-only)
- [ ] Runbooks accessible
- [ ] Contact list up to date
- [ ] Escalation paths defined

### Escalation Path
1. **L1**: On-call engineer (first responder)
2. **L2**: Senior engineer (complex issues)
3. **L3**: Tech lead (architectural issues)
4. **L4**: Engineering manager (critical incidents)

## Production Checklist

### Daily
- [ ] Check error rates
- [ ] Review critical alerts
- [ ] Monitor system health
- [ ] Check backup status

### Weekly
- [ ] Review performance metrics
- [ ] Analyze error trends
- [ ] Check capacity usage
- [ ] Review incident reports

### Monthly
- [ ] Capacity planning review
- [ ] Update runbooks
- [ ] Review SLAs
- [ ] Conduct DR drills

## Next Steps

After production support work:
1. Document incident and resolution
2. Create follow-up tasks
3. Update runbooks and documentation
4. Collaborate with Maintenance Engineer for permanent fixes
5. Share learnings with team
6. Update monitoring and alerts if needed
