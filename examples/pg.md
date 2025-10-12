```mehrmaid
graph LR

T1 --> T2 --> T3 --> T4
T1("$\nabla_\theta J(\theta)$")
T2("$\nabla_\theta \mathbb{E}_{\tau\sim p_\theta}[R(\tau)]$")
T3("$\mathbb{E}_{\tau\sim p_\theta}[\nabla_\theta \log p_\theta(\tau)\, R(\tau)]$")
T4("$\mathbb{E}_{\tau\sim p_\theta}\!\left[\sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t)\, G_t\right]$")
```
