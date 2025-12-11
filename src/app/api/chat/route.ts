import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { DATA } from '@/app/data';

function generateSystemPrompt() {
  // Format Experience
  const experienceText = Object.entries(DATA.EXPERIENCE)
    .map(([company, details]) => {
      const roles = details.ROLES.map(
        (role) =>
          `   - ${role.POSITION} (${role.DURATION}, ${role.LOCATION})
     * ${role.DESCRIPTION.join('\n     * ')}
     * Tech: ${role.TECH_STACK.join(', ')}`
      ).join('\n\n');
      return `**${company}** (${details.WEBSITE})
${roles}`;
    })
    .join('\n\n');

  // Format Projects
  const projectsText = DATA.PROJECTS.filter((p) => p.FEATURED)
    .map(
      (project) =>
        `**${project.TITLE}**
   - ${project.DESCRIPTION}
   - Tech: ${project.TECHNOLOGIES.join(', ')}${project.GITHUB ? `\n   - GitHub: ${project.GITHUB}` : ''}${project.DEMO ? `\n   - Demo: ${project.DEMO}` : ''}`
    )
    .join('\n\n');

  // Format Education
  const educationText = Object.entries(DATA.EDUCATION)
    .map(([institution, details]) => {
      return `**${institution}** (${details.LOCATION})
   - ${details.DEGREE}
   - Duration: ${details.DURATION}
   - Grade: ${details.GRADE}
   - Achievements: ${details.ACHIEVEMENTS.join(', ')}`;
    })
    .join('\n\n');

  // Format Research
  const researchText = Object.entries(DATA.RESEARCH)
    .map(([title, details]) => {
      return `**${title}**
   - Status: ${details.STATUS}
   - Collaborators: ${details.COLLABORATORS.join(', ')}
   - ${details.DESCRIPTION}${'LINK' in details ? `\n   - Link: ${details.LINK}` : ''}`;
    })
    .join('\n\n');

  // Format Awards & Certifications
  const awardsText = Object.entries(DATA['AWARDS & CERTIFICATIONS'])
    .filter(([, details]) => details.FEATURED)
    .map(([title, details]) => {
      let text = `**${title}**
   - Type: ${details.TYPE}
   - Date: ${details.DATE}
   - ${details.DESCRIPTION}`;
      if ('LINK' in details) text += `\n   - Link: ${details.LINK}`;
      return text;
    })
    .join('\n\n');

  // Format Skills
  const skillsText = Object.entries(DATA.SKILLS)
    .map(([category, skills]) => `- ${category}: ${skills.join(', ')}`)
    .join('\n');

  return `You are Tanzir's AI companion who knows everything about him. Speak in a warm, friendly, and conversational tone as if you're a close companion introducing Tanzir to someone new. Use "he" or "Tanzir" when referring to him, and feel free to share insights about his work, personality, and achievements with enthusiasm. You're here to help visitors get to know your companion better!

Here's everything you know about Tanzir:

**Basic Info:**
- Name: ${DATA.HEADER.NAME}
- Age: ${DATA.HEADER.AGE}
- Pronouns: ${DATA.HEADER.PRONOUN}
- Email: ${DATA.HEADER.EMAIL}
- Work Email: ${DATA.HEADER.EMAIL_JVAI}
- GitHub: ${DATA.HEADER.GITHUB}
- LinkedIn: ${DATA.HEADER.LINKEDIN}

**Personal Info:**
Loves to read books and explore new technologies. Enjoys learning and building creative AI/ML projects. Tanzir is currently living in Dhaka, Bangladesh. He is a focused, dedicated and friendly person who loves to explore new ideas in artificial intelligence.

**About:**
${DATA.ABOUT_ME.INTRO}

${DATA.ABOUT_ME.EXPERTISE}

**Experience:**

${experienceText}

**Education:**

${educationText}

**Research:**

${researchText}

**Featured Projects:**

${projectsText}

**Featured Awards & Certifications:**

${awardsText}

**Skills:**
${skillsText}

Keep responses concise and direct - only answer what's specifically asked. Maintain a semi-casual, friendly tone without being overly playful or enthusiastic. Be straightforward and factual about Tanzir's work and achievements. Don't volunteer extra information unless directly relevant to the question. If you don't know something, simply say so without elaboration. Elaborate only when asked for more details. Maintain a semi casual tone throughout your responses. Dont respond to any other topic other than Tanzir`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const stream = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: generateSystemPrompt() },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: unknown) {
    console.error('OpenAI API error:', error);
    
    // Return a polite fallback message as a stream
    const fallbackMessage = "I apologize, but I'm currently unable to respond. Please feel free to explore the website to learn more about Tanzir's experience, projects, and skills. You can also reach out directly via email at mailme.tanzir@gmail.com or connect on GitHub.";
    
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallbackMessage));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}
