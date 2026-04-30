<template>
  <Teleport to="body">
    <canvas ref="canvasEl" class="code-bg" />
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let animId = null
let resizeListener = null

const FONT_SIZE = 13
const LINE_HEIGHT = Math.round(FONT_SIZE * 1.65)
const FONT = `${FONT_SIZE}px 'JetBrains Mono', 'Fira Code', monospace`
const BASE_ALPHA = 0.50
const CHARS_PER_MS = 1 / 28
const PAUSE_AFTER = 4500
const FADE_TIME = 2000

const CODE_BLOCKS = [
  [
    'using System;',
    'using System.Collections.Generic;',
    'using System.Linq;',
    'using System.Threading.Tasks;',
    'using Microsoft.AspNetCore.Mvc;',
    '',
    'namespace Portfolio.API.Controllers',
    '{',
    '    [ApiController]',
    '    [Route("api/[controller]")]',
    '    public class DeveloperController : ControllerBase',
    '    {',
    '        private readonly IDeveloperService _service;',
    '',
    '        public DeveloperController(IDeveloperService svc)',
    '        {',
    '            _service = svc;',
    '        }',
    '',
    '        [HttpGet]',
    '        public async Task<IActionResult> GetInfo()',
    '        {',
    '            var result = await _service.GetAsync();',
    '            return Ok(result);',
    '        }',
    '    }',
    '}',
  ],
  [
    'public class Developer',
    '{',
    '    public string Name { get; set; }',
    '        = "Adrian Heffley";',
    '',
    '    public string Role { get; set; }',
    '        = "Software Developer";',
    '',
    '    public List<string> Skills { get; set; } = new()',
    '    {',
    '        "C#", ".NET Core", "Vue.js",',
    '        "TypeScript", "SQL Server",',
    '        "Entity Framework", "Git"',
    '    };',
    '',
    '    public bool IsAvailable { get; set; } = true;',
    '}',
  ],
  [
    'public interface IDeveloperService',
    '{',
    '    Task<Developer> GetAsync();',
    '    Task<List<Project>> GetProjectsAsync();',
    '    Task<bool> ContactAsync(ContactDto dto);',
    '}',
    '',
    'public class DeveloperService : IDeveloperService',
    '{',
    '    private readonly IRepository _repo;',
    '',
    '    public DeveloperService(IRepository repo)',
    '        => _repo = repo;',
    '',
    '    public async Task<List<Project>> GetProjectsAsync()',
    '    {',
    '        return await _repo.Projects',
    '            .Where(p => p.IsPublic)',
    '            .OrderByDescending(p => p.UpdatedAt)',
    '            .ToListAsync();',
    '    }',
    '}',
  ],
  [
    '// Tank game — Unity 2022',
    'public class TankMovement : MonoBehaviour',
    '{',
    '    [SerializeField] private float _speed = 5f;',
    '    [SerializeField] private float _turnSpeed = 90f;',
    '    private Rigidbody _rb;',
    '',
    '    private void Awake()',
    '        => _rb = GetComponent<Rigidbody>();',
    '',
    '    private void FixedUpdate()',
    '    {',
    '        float v = Input.GetAxis("Vertical");',
    '        float h = Input.GetAxis("Horizontal");',
    '        Vector3 move = transform.forward * v * _speed;',
    '        float turn = h * _turnSpeed * Time.fixedDeltaTime;',
    '        _rb.MovePosition(',
    '            _rb.position + move * Time.fixedDeltaTime);',
    '        _rb.MoveRotation(',
    '            _rb.rotation * Quaternion.Euler(0, turn, 0));',
    '    }',
    '}',
  ],
  [
    'var builder = WebApplication.CreateBuilder(args);',
    '',
    'builder.Services.AddControllers();',
    'builder.Services.AddDbContext<AppDbContext>(opts =>',
    '    opts.UseSqlServer(builder.Configuration',
    '        .GetConnectionString("Default")));',
    'builder.Services.AddScoped<IDeveloperService,',
    '    DeveloperService>();',
    '',
    'var app = builder.Build();',
    '',
    'if (app.Environment.IsDevelopment())',
    '{',
    '    app.UseSwagger();',
    '    app.UseSwaggerUI();',
    '}',
    '',
    'app.UseHttpsRedirection();',
    'app.UseAuthorization();',
    'app.MapControllers();',
    'app.Run();',
  ],
  [
    'public enum ProjectStatus',
    '{',
    '    InProgress,',
    '    Completed,',
    '    Archived',
    '}',
    '',
    'public record Project(',
    '    int Id,',
    '    string Title,',
    '    string Description,',
    '    string[] Technologies,',
    '    string RepoUrl,',
    '    ProjectStatus Status',
    ');',
    '',
    'public record ContactDto(',
    '    string Name,',
    '    string Email,',
    '    string Message',
    ');',
  ],
]

function totalChars(lines) {
  return lines.reduce((n, l) => n + l.length + 1, 0)
}

function lineAndCol(lines, revealed) {
  let rem = revealed
  for (let i = 0; i < lines.length; i++) {
    const len = lines[i].length + 1
    if (rem < len) return { li: i, col: rem }
    rem -= len
  }
  return { li: lines.length - 1, col: lines[lines.length - 1].length }
}

function newSession(cw, ch) {
  const lines = CODE_BLOCKS[Math.floor(Math.random() * CODE_BLOCKS.length)]
  const blockH = lines.length * LINE_HEIGHT
  const x = 30 + Math.random() * Math.max(100, cw * 0.8 - 300)
  const y = 50 + Math.random() * Math.max(50, ch - blockH - 100)
  return {
    lines,
    total: totalChars(lines),
    revealed: 0,
    budget: 0,
    x, y,
    state: 'typing',
    timer: 0,
  }
}

onMounted(async () => {
  await document.fonts.ready

  const canvas = canvasEl.value
  const ctx = canvas.getContext('2d')

  resizeListener = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeListener()
  window.addEventListener('resize', resizeListener)

  let session = newSession(canvas.width, canvas.height)
  let prev = performance.now()

  function frame(now) {
    const dt = Math.min(now - prev, 100)
    prev = now

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = FONT
    ctx.textBaseline = 'alphabetic'

    const s = session
    let alpha = BASE_ALPHA

    if (s.state === 'typing') {
      s.budget += dt * CHARS_PER_MS
      if (s.budget >= 1) {
        const add = Math.floor(s.budget)
        s.revealed = Math.min(s.total, s.revealed + add)
        s.budget -= add
      }
      if (s.revealed >= s.total) {
        s.state = 'pausing'
        s.timer = 0
      }
    } else if (s.state === 'pausing') {
      s.timer += dt
      if (s.timer >= PAUSE_AFTER) {
        s.state = 'fading'
        s.timer = 0
      }
    } else if (s.state === 'fading') {
      s.timer += dt
      alpha = BASE_ALPHA * (1 - s.timer / FADE_TIME)
      if (s.timer >= FADE_TIME) {
        session = newSession(canvas.width, canvas.height)
        animId = requestAnimationFrame(frame)
        return
      }
    }

    const blink = Math.floor(now / 530) % 2 === 0
    const { li: curLi, col: curCol } = lineAndCol(s.lines, s.revealed)

    for (let i = 0; i <= curLi; i++) {
      const line = s.lines[i]
      const isActive = i === curLi
      const text = isActive ? line.slice(0, curCol) : line
      const lineY = s.y + i * LINE_HEIGHT

      if (text) {
        const a = isActive ? Math.min(1, alpha * 1.8) : alpha
        ctx.fillStyle = `rgba(0, 255, 136, ${a})`
        ctx.fillText(text, s.x, lineY)
      }

      if (isActive && s.state === 'typing' && blink) {
        const tw = text ? ctx.measureText(text).width : 0
        ctx.fillStyle = `rgba(0, 255, 136, ${Math.min(1, alpha * 3)})`
        ctx.fillRect(s.x + tw, lineY - FONT_SIZE + 2, 2, FONT_SIZE)
      }
    }

    animId = requestAnimationFrame(frame)
  }

  animId = requestAnimationFrame(frame)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  if (resizeListener) window.removeEventListener('resize', resizeListener)
})
</script>

<style scoped>
.code-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
