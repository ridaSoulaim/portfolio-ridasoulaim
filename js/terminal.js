/**
 * Interactive Terminal Emulator Widget for the  Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const commandChips = document.querySelectorAll('.command-chip');
  const clearBtn = document.getElementById('term-clear-btn');

  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => {
      return `
<span class="highlight">Available Commands:</span>
  <span style="color:#7ee787">about</span>     - Learn more about Rida Soulaim
  <span style="color:#7ee787">skills</span>    - View full technology stack & competencies
  <span style="color:#7ee787">projects</span>  - Explore flagship featured projects
  <span style="color:#7ee787">contact</span>   - Get email, socials, & contact information
  <span style="color:#7ee787">resume</span>    - View resume summary & highlights
  <span style="color:#7ee787">theme</span>     - Toggle between Dark & Light themes
  <span style="color:#7ee787">whoami</span>    - Display current visitor profile
  <span style="color:#7ee787">clear</span>     - Clear terminal screen
  <span style="color:#7ee787">sudo</span>      - Execute command with superuser privileges
      `;
    },

    about: () => {
      return `
<span class="highlight">Rida Soulaim</span> — Fresh Graduate & Full-Stack Web Developer
----------------------------------------------------------------------
• Status: Fresh Diplomate (2026) — Ready for Junior & Entry-Level Developer positions.
• Education: Specialized Technician in Full Stack Web Development (OFPPT - ISTA Sidi Youssef Ben Ali, Class of 2026).
• Practical Experience: 1 Graduation Internship at the Presidency of Cadi Ayyad - Marrakech (Laravel RBAC platform).
• Core Stack: Laravel, React.js, PHP, JavaScript (ES6+), MySQL, NoSQL, Git.
• Certification: Cisco Certification in Data Science (2023).
• Languages: Arabic (Native), French (Secondary), English (ALC Advanced Level 6).
• Location: Marrakech, Morocco.
      `;
    },

    skills: () => {
      return `
<span class="highlight">Tech Stack Breakdown:</span>
• <span style="color:#38bdf8">Frontend:</span>    HTML, CSS, JavaScript, React.js
• <span style="color:#f43f5e">Backend:</span>     Laravel, PHP, RESTful APIs, MVC
• <span style="color:#34d399">Databases:</span>   MySQL, NoSQL
• <span style="color:#2496ed">Versioning:</span>  Git & GitHub
      `;
    },

    projects: () => {
      return `
<span class="highlight">Flagship Works:</span>
1. <span style="color:#f97316; font-weight:bold;">Building Project</span>  — Architecture & Construction Web Platform (<a href="https://building-project-2.vercel.app" target="_blank" style="color:#58a6ff; text-decoration:underline;">Live Demo</a> | <a href="https://github.com/ridaSoulaim/building-project-" target="_blank" style="color:#58a6ff; text-decoration:underline;">GitHub</a>)
2. <span style="color:#f43f5e; font-weight:bold;">Samira Art</span>        — Artist Portfolio & Online Store (<a href="https://github.com/ridaSoulaim/samiraart" target="_blank" style="color:#58a6ff; text-decoration:underline;">GitHub</a>)
3. <span style="color:#38bdf8; font-weight:bold;">Cadi Ayyad App</span>    — Internship Request Platform with Role-Based Authentication (Laravel & MySQL)
4. <span style="color:#34d399; font-weight:bold;">Morocco Map</span>       — Interactive Regional & Geospatial Explorer (<a href="https://github.com/ridaSoulaim/moroccomap" target="_blank" style="color:#58a6ff; text-decoration:underline;">GitHub</a>)

Type <span style="color:#7ee787">'contact'</span> to discuss building your next project!
      `;
    },

    contact: () => {
      return `
<span class="highlight">Connect with Rida Soulaim:</span>
• <span style="color:#38bdf8">Email:</span>     <a href="mailto:ridasoul3@gmail.com" style="color:#58a6ff; text-decoration:underline;">ridasoul3@gmail.com</a>
• <span style="color:#818cf8">GitHub:</span>    <a href="https://github.com/ridaSoulaim" target="_blank" rel="noopener" style="color:#58a6ff; text-decoration:underline;">github.com/ridaSoulaim</a>
• <span style="color:#38bdf8">LinkedIn:</span>  <a href="https://www.linkedin.com/in/rida-soulaim-07a191263" target="_blank" rel="noopener" style="color:#58a6ff; text-decoration:underline;">linkedin.com/in/rida-soulaim-07a191263</a>
• <span style="color:#34d399">Status:</span>    🟢 Open for full-time roles & high-impact development opportunities.
      `;
    },

    resume: () => {
      return `
<span class="highlight">Resume Summary:</span>
• <b>Name:</b> Rida SOULAIM
• <b>Profile:</b> Fresh Graduate & Full-Stack Web Developer
• <b>Status:</b> Newly Graduated (2026) — Open to Junior & Entry-Level Opportunities
• <b>Education:</b> Specialized Technician: FULL STACK Web Developer (OFPPT - ISTA Sidi Youssef Ben Ali, Class of 2026)
• <b>Scientific Degree:</b> Diploma in Experimental Sciences: Physics (Baccalaureate 2019)
• <b>Certification:</b> Cisco Certification in Data Science (2023)
• <b>Only Internship:</b> Presidency of Cadi Ayyad - Marrakech (Laravel RBAC Internship App)
• <b>Languages:</b> Arabic (Native), French, English (ALC Level 6)
<a href="#contact" class="highlight" style="text-decoration:underline;">Click here to get in touch</a>
      `;
    },

    theme: () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return `Theme switched to <span class="highlight">${newTheme.toUpperCase()}</span> mode.`;
    },

    whoami: () => {
      return `guest@portfolio-visitor [Permissions: Explore, Inspect, Hire]`;
    },

    sudo: () => {
      return `<span style="color:#f43f5e">Permission denied: You are already a VIP guest! 😄</span>`;
    },

    date: () => {
      return new Date().toUTCString();
    },

    clear: () => {
      const promptLine = document.querySelector('.terminal-input-wrapper');
      terminalBody.innerHTML = '';
      if (promptLine) {
        terminalBody.appendChild(promptLine);
      }
      return null;
    }
  };

  function executeCommand(inputVal) {
    const raw = inputVal.trim();
    if (!raw) return;

    commandHistory.push(raw);
    historyIndex = commandHistory.length;

    // Create command line entry
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-output-line terminal-prompt-line';
    cmdLine.innerHTML = `<span class="terminal-prompt">rida@dev:~$</span> <span>${escapeHtml(raw)}</span>`;

    // Process output
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-output-line';

    const normalizedCmd = raw.toLowerCase().split(' ')[0];

    if (normalizedCmd === 'clear') {
      commands.clear();
      terminalInput.value = '';
      return;
    }

    if (commands[normalizedCmd]) {
      outputLine.innerHTML = commands[normalizedCmd]();
    } else {
      outputLine.innerHTML = `<span style="color:#f43f5e">Command not recognized: '${escapeHtml(raw)}'. Type <span style="color:#7ee787">'help'</span> for a list of valid commands.</span>`;
    }

    // Insert before prompt
    const promptWrapper = document.querySelector('.terminal-input-wrapper');
    terminalBody.insertBefore(cmdLine, promptWrapper);
    terminalBody.insertBefore(outputLine, promptWrapper);

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  // Handle command chips click
  commandChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd') || chip.textContent.trim();
      executeCommand(cmd);
      terminalInput.focus();
    });
  });

  // Handle clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      commands.clear();
      terminalInput.focus();
    });
  }
});
