# Data Attributes

All `data-*` attributes used by the WebBeagle system.

## Animation Attributes

| Attribute | Applies to | Values | Description |
|---|---|---|---|
| `data-animate` | Container | `fade-up`, `fade-in`, `slide-left`, `slide-right`, `zoom-in` | Animation preset |
| `data-stagger` | Container | Milliseconds (e.g., `120`) | Delay between children |
| `data-duration` | Container | Milliseconds (e.g., `800`) | Animation duration |
| `data-easing` | Container | CSS easing (e.g., `cubic-bezier(...)`) | Timing function |
| `data-initial-opacity` | Container | `0`–`1` | Starting opacity |
| `data-offset` | Container | Pixels (e.g., `40`) | Translation distance |
| `data-trigger` | Container | `scroll`, `load` | When animation fires |
| `data-animate-item` | Child elements | (no value) | Marks as animation target |

## Form Attributes

| Attribute | Applies to | Values | Description |
|---|---|---|---|
| `data-webbeagle-form` | `<form>` | (no value) | Enables form handling |
| `data-form-thankyou` | `<form>` | Text string | Custom thank-you message |

## Template Attributes

| Attribute | Applies to | Values | Description |
|---|---|---|---|
| `data-block` | Any element | Block name | Identifies block source |
| `data-component` | Any element | Component ID | References saved component |

## How Attributes are Used

### Animation Flow

```
[data-animate="fade-up"] [data-stagger="150"]  ← Container
  ├── [data-animate-item]                        ← Child 1 (0ms delay)
  ├── [data-animate-item]                        ← Child 2 (150ms delay)
  └── [data-animate-item]                        ← Child 3 (300ms delay)
```

### Form Flow

```
<form data-webbeagle-form data-form-thankyou="We'll be in touch!">
  <!-- Fields -->
</form>
```

↓ On submit, the JS runtime:

1. Injects honeypot
2. Collects form data
3. POSTs to `/api/submit-form`
4. Replaces form with `data-form-thankyou` message

### Single Element Animation

When `data-animate` is on a container with no `data-animate-item` children, the engine adds `data-animate-item` to the container itself — it becomes its own animation target.
