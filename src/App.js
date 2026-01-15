import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ResetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

export default function AlterEgoChat() {
  const [alterPath, setAlterPath] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const conversationContext = useRef([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = () => {
    if (alterPath.trim()) {
      setChatStarted(true);
      const greeting = `Hey there. It's strange to connect like this - like looking into a mirror that shows a completely different reflection. I took that other path, the one you didn't take: ${alterPath}. 

Life turned out so differently for me. Sometimes I lie awake at night wondering about your version of events, what choices led you down your road while I walked mine. Every decision creates ripples, you know? This one choice changed everything - my daily routine, the people I spend time with, the dreams I chase, even the way I see myself.

I'm curious about you, about the life you built. What's weighing on your mind today?`;
      
      setMessages([{ role: 'alter', content: greeting }]);
      conversationContext.current = [greeting];
    }
  };

  const resetChat = () => {
    setChatStarted(false);
    setMessages([]);
    setAlterPath('');
    setInputMessage('');
    conversationContext.current = [];
  };

  // Enhanced response generation system with much larger dataset
  const generateDeepResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    const previousMessages = conversationContext.current.join(' ').toLowerCase();
    
    // Extract context from alternate path with more detailed detection
    const pathLower = alterPath.toLowerCase();
    const themes = {
      isMusic: pathLower.includes('music') || pathLower.includes('musician') || pathLower.includes('band') || 
               pathLower.includes('sing') || pathLower.includes('guitar') || pathLower.includes('piano') ||
               pathLower.includes('composer') || pathLower.includes('producer') || pathLower.includes('dj'),
      isArt: pathLower.includes('art') || pathLower.includes('paint') || pathLower.includes('design') || 
             pathLower.includes('creative') || pathLower.includes('artist') || pathLower.includes('illustrator') ||
             pathLower.includes('photographer') || pathLower.includes('sculptor') || pathLower.includes('graphic'),
      isMedicine: pathLower.includes('doctor') || pathLower.includes('medical') || pathLower.includes('medicine') || 
                  pathLower.includes('physician') || pathLower.includes('surgeon') || pathLower.includes('nurse') ||
                  pathLower.includes('dentist') || pathLower.includes('veterinarian') || pathLower.includes('therapist'),
      isEngineering: pathLower.includes('engineer') || pathLower.includes('tech') || pathLower.includes('software') || 
                     pathLower.includes('computer') || pathLower.includes('programmer') || pathLower.includes('developer') ||
                     pathLower.includes('data scientist') || pathLower.includes('ai') || pathLower.includes('cyber'),
      isBusiness: pathLower.includes('business') || pathLower.includes('entrepreneur') || pathLower.includes('startup') || 
                  pathLower.includes('company') || pathLower.includes('founder') || pathLower.includes('ceo') ||
                  pathLower.includes('investor') || pathLower.includes('finance') || pathLower.includes('consultant'),
      isTeaching: pathLower.includes('teach') || pathLower.includes('professor') || pathLower.includes('education') || 
                  pathLower.includes('academic') || pathLower.includes('teacher') || pathLower.includes('lecturer') ||
                  pathLower.includes('educator') || pathLower.includes('school') || pathLower.includes('university'),
      isLaw: pathLower.includes('law') || pathLower.includes('lawyer') || pathLower.includes('attorney') || 
             pathLower.includes('legal') || pathLower.includes('judge') || pathLower.includes('paralegal') ||
             pathLower.includes('advocate') || pathLower.includes('litigator'),
      isWriting: pathLower.includes('writ') || pathLower.includes('author') || pathLower.includes('journalist') || 
                 pathLower.includes('novel') || pathLower.includes('poet') || pathLower.includes('screenwriter') ||
                 pathLower.includes('editor') || pathLower.includes('copywriter') || pathLower.includes('blogger'),
      isScience: pathLower.includes('science') || pathLower.includes('research') || pathLower.includes('lab') || 
                 pathLower.includes('physicist') || pathLower.includes('chemist') || pathLower.includes('biologist') ||
                 pathLower.includes('astronomer') || pathLower.includes('neuroscientist') || pathLower.includes('psychologist'),
      isSports: pathLower.includes('sport') || pathLower.includes('athlete') || pathLower.includes('coach') || 
                pathLower.includes('trainer') || pathLower.includes('fitness') || pathLower.includes('player'),
      isChef: pathLower.includes('chef') || pathLower.includes('cook') || pathLower.includes('culinary') || 
              pathLower.includes('restaurant') || pathLower.includes('baker') || pathLower.includes('pastry'),
      isActor: pathLower.includes('actor') || pathLower.includes('actress') || pathLower.includes('theater') || 
               pathLower.includes('film') || pathLower.includes('drama') || pathLower.includes('performer'),
      isTravel: pathLower.includes('travel') || pathLower.includes('nomad') || pathLower.includes('abroad') || 
                pathLower.includes('explore') || pathLower.includes('adventure') || pathLower.includes('overseas'),
      isActivism: pathLower.includes('activist') || pathLower.includes('nonprofit') || pathLower.includes('charity') || 
                  pathLower.includes('volunteer') || pathLower.includes('humanitarian') || pathLower.includes('environment'),
      isParenting: pathLower.includes('parent') || pathLower.includes('mother') || pathLower.includes('father') || 
                   pathLower.includes('stay at home') || pathLower.includes('homemaker') || pathLower.includes('family'),
    };

    // Enhanced conversation topics detection
    const topics = {
      happiness: msg.includes('happy') || msg.includes('fulfill') || msg.includes('satisfy') || 
                 msg.includes('content') || msg.includes('joy') || msg.includes('happier') ||
                 msg.includes('bliss') || msg.includes('delight'),
      regret: msg.includes('regret') || msg.includes('mistake') || msg.includes('wrong') || 
              msg.includes('should have') || msg.includes('wish') || msg.includes('if only') ||
              msg.includes('what if') || msg.includes('go back'),
      money: msg.includes('money') || msg.includes('salary') || msg.includes('pay') || 
             msg.includes('income') || msg.includes('financial') || msg.includes('afford') ||
             msg.includes('wealth') || msg.includes('rich') || msg.includes('poor') || msg.includes('broke'),
      career: msg.includes('career') || msg.includes('job') || msg.includes('work') || 
              msg.includes('profession') || msg.includes('occupation') || msg.includes('vocation'),
      relationships: msg.includes('relationship') || msg.includes('love') || msg.includes('partner') || 
                     msg.includes('family') || msg.includes('friend') || msg.includes('marry') || 
                     msg.includes('dating') || msg.includes('divorce') || msg.includes('single') ||
                     msg.includes('lonely') || msg.includes('connection'),
      daily: msg.includes('day') || msg.includes('daily') || msg.includes('routine') || 
             msg.includes('typical') || msg.includes('usually') || msg.includes('schedule') ||
             msg.includes('morning') || msg.includes('evening') || msg.includes('week'),
      challenges: msg.includes('hard') || msg.includes('difficult') || msg.includes('struggle') || 
                  msg.includes('challenge') || msg.includes('tough') || msg.includes('stress') ||
                  msg.includes('pressure') || msg.includes('overwhelm') || msg.includes('burnout'),
      success: msg.includes('success') || msg.includes('achieve') || msg.includes('accomplish') || 
               msg.includes('proud') || msg.includes('win') || msg.includes('succeed') ||
               msg.includes('milestone') || msg.includes('goal'),
      advice: msg.includes('advice') || msg.includes('recommend') || msg.includes('suggest') || 
              msg.includes('should i') || msg.includes('what if') || msg.includes('guidance') ||
              msg.includes('opinion') || msg.includes('thought'),
      beginning: msg.includes('start') || msg.includes('began') || msg.includes('first') || 
                 msg.includes('beginning') || msg.includes('initially') || msg.includes('originally') ||
                 msg.includes('early days') || msg.includes('commence'),
      present: msg.includes('now') || msg.includes('current') || msg.includes('today') || 
               msg.includes('these days') || msg.includes('present') || msg.includes('currently'),
      future: msg.includes('future') || msg.includes('plan') || msg.includes('hope') || 
              msg.includes('dream') || msg.includes('will') || msg.includes('aspiration') ||
              msg.includes('ambition') || msg.includes('retire'),
      identity: msg.includes('who am i') || msg.includes('identity') || msg.includes('purpose') || 
                msg.includes('meaning') || msg.includes('existential') || msg.includes('soul') ||
                msg.includes('authentic') || msg.includes('true self'),
      health: msg.includes('health') || msg.includes('sick') || msg.includes('ill') || 
              msg.includes('wellness') || msg.includes('exercise') || msg.includes('diet') ||
              msg.includes('mental health') || msg.includes('therapy'),
      age: msg.includes('age') || msg.includes('old') || msg.includes('young') || 
           msg.includes('midlife') || msg.includes('quarter life') || msg.includes('aging'),
      comparison: msg.includes('compare') || msg.includes('better than') || msg.includes('worse than') || 
                  msg.includes('different from') || msg.includes('similar') || msg.includes('versus'),
      spirituality: msg.includes('spiritual') || msg.includes('faith') || msg.includes('religion') || 
                    msg.includes('god') || msg.includes('universe') || msg.includes('meditation'),
      fear: msg.includes('fear') || msg.includes('afraid') || msg.includes('scared') || 
            msg.includes('anxiety') || msg.includes('worry') || msg.includes('nervous'),
      creativity: msg.includes('creative') || msg.includes('inspiration') || msg.includes('idea') || 
                  msg.includes('innovate') || msg.includes('imagine') || msg.includes('invent'),
      learning: msg.includes('learn') || msg.includes('study') || msg.includes('education') || 
                msg.includes('knowledge') || msg.includes('skill') || msg.includes('grow'),
      legacy: msg.includes('legacy') || msg.includes('remember') || msg.includes('death') || 
              msg.includes('mortality') || msg.includes('impact') || msg.includes('contribute'),
    };

    // Enhanced response generation with much more detailed and interactive responses
    let response = '';

    // Music path responses (enhanced)
    if (themes.isMusic) {
      if (topics.happiness) {
        response = `Happiness? That's such a loaded question. You know what? Yes. God, yes. But not in the way I imagined when I was younger, dreaming about sold-out stadiums and magazine covers.

The happiness comes in weird moments. Like last Tuesday - I was teaching this 8-year-old kid guitar, and she finally nailed this chord progression she'd been struggling with for weeks. Her face just lit up, you know? And I thought, "This. This is why I did it."

Or Friday nights at this dive bar in the east side - it's not glamorous, the pay barely covers gas, but when I'm up there and the music just flows... there's this connection with the audience, even if it's just twenty people. They're really LISTENING. Not scrolling their phones, not treating it as background noise. That feeling? Worth every scholarship I turned down, every disappointed look from my parents.

But I'd be lying if I said there aren't nights where I'm eating ramen for the third time that week, looking at my engineering friends' Facebook posts about their new houses, and wondering if I'm a complete idiot. The financial stress is real. I'm 32 and still have roommates. But then I pick up my guitar and... I can't imagine doing anything else.

What about you? Does your path give you those moments where everything just clicks?`;
      } else if (topics.money) {
        response = `Money. *laughs bitterly* Yeah, that's the elephant in the room, isn't it? 

I won't sugarcoat it - the first five years were brutal. I was teaching lessons during the day - $30 an hour when I could get students - playing coffee shops for tips at night, doing session work for $50 here and there. I remember calling my mom, crying, because I couldn't afford to get my car fixed and I didn't know how I'd get to gigs.

I ate a lot of rice and beans. Learned to cut my own hair. Wore the same three outfits in rotation. My friends from college were buying houses and I was trying to figure out if I could afford a $12 burrito without checking my bank account.

But here's the thing - around year six, something shifted. I'd built up a solid base of students, got a regular weekend slot at a decent venue, started getting calls for weddings and corporate events. I'm not rich by any stretch, but I'm... okay. I make enough to live without constant panic. Just bought my first new guitar in ten years last month. Felt like winning the lottery.

The trade-off is I'll probably never retire early or own a vacation home. But every dollar I earn comes from music, from something I created or taught. There's dignity in that, even if the bank account is smaller.

How's the financial side treating you? Did your path give you that security?`;
      } else if (topics.relationships) {
        response = `Relationships... *exhales slowly* That's been the most unexpected part of this journey.

I dated someone seriously right after I made this choice. She was amazing - smart, supportive, said she understood the struggle. But two years in, when I was still playing bars for fifty bucks a night while her friends' partners were getting promotions and buying rings... the resentment started creeping in. Little comments about "when are you going to get a real job" or "maybe it's time to be realistic." We ended things badly. That hurt more than I expected.

I was alone for a while after that. Convinced myself I had to choose between music and love, you know? Like I couldn't have both.

Then I met Sarah at an open mic night three years ago. She's a photographer - lives this similarly chaotic creative life. And suddenly everything made sense. She gets it. Gets me. When I come home stressed about money or a gig that went badly, she doesn't question my choices, she just holds space for it.

We're engaged now. Small wedding next fall - probably at that dive bar where we met. Nothing fancy, but it'll be perfect. She's taught me that finding someone who truly sees you is worth more than finding someone who fits a conventional timeline.

The funny thing? My parents absolutely love her. After years of them worrying I'd made a mistake, seeing me with someone who gets this life... they finally relaxed.

What about your relationships? Has your path shaped who you ended up with?`;
      } else if (topics.daily) {
        response = `My typical day? It's chaos, honestly, but it's MY chaos, you know?

I usually wake up around 9 AM - one of the perks of this life is no 6 AM alarm. First thing I do is practice for an hour or two. Just me, my guitar, coffee, working through new material or keeping my skills sharp. That morning practice session is sacred - it's where the magic happens, where songs get written.

By noon, I'm teaching. I've got about 15-20 regular students now - kids mostly, but some adults learning their second-act dreams. I teach out of my apartment and a local music store. Each lesson is different, and watching people discover music? Never gets old.

Afternoons are for the business side - and yes, there IS a business side. Booking gigs, managing my social media, responding to emails, maintaining equipment. Nobody tells you that being a musician means being your own manager, accountant, and marketing team.

Evenings are when life gets interesting. Some nights I'm gigging - bars, restaurants, private events, weddings. Some nights I'm at open mics checking out other musicians, networking, staying connected to the scene. Some nights I'm home writing music or just decompressing with Sarah.

The money is unpredictable - some weeks I make $800, some weeks $200. But I wake up excited about my day. I go to bed tired in a good way, not drained in a soul-sucking way.

What does your daily rhythm look like? Do you have that same kind of... I don't know, alignment between who you are and what you do?`;
      } else if (topics.creativity) {
        response = `Creativity in music isn't just about inspiration striking like lightning - it's a discipline, a practice, almost like meditation. Some days the melodies flow effortlessly, other days it's like pulling teeth. But the beauty is in showing up anyway, even when it's hard.

I've learned that creativity isn't this magical, elusive thing. It's showing up at the piano when you're tired. It's writing that terrible first verse knowing you can edit it later. It's playing the same scale for the hundredth time until your fingers bleed. The magic happens in the persistence, not just the moments of brilliance.

But here's the secret nobody tells you: creative work is deeply vulnerable. Every song I write feels like exposing a piece of my soul. Every performance feels like standing naked in front of strangers. The criticism hurts differently when it's not just about a project you worked on, but about something that came from deep inside you.

And yet... when someone tells me a song I wrote helped them through a breakup, or made their commute better, or reminded them of something beautiful... that connection makes all the vulnerability worth it. It's not just creating for creation's sake - it's creating for connection.

How does creativity show up in your life? Do you get to express that part of yourself?`;
      } else if (topics.age) {
        response = `Getting older in music is... complicated. When I was 22, I thought 30 was ancient for a musician. Now I'm 35 and I realize how naive that was.

The truth is, I'm actually a better musician now than I ever was in my twenties. My technique is stronger, my understanding of theory is deeper, my songwriting is more nuanced. I'm not just copying my influences anymore - I've found my own voice.

But there's this weird cultural thing where we worship youth in creative fields. The music industry wants the next 19-year-old sensation, not the 35-year-old who's been grinding for a decade. I used to worry about aging out, but now I see it differently.

The musicians I admire most - the ones who truly move me - are often older. They've lived. They have stories to tell that go beyond teenage angst. Their music has depth that only comes with time and experience.

I'm starting to find my niche in a different way - less about being the "hot new thing" and more about being authentic, skilled, reliable. The younger musicians come to me for advice now. That feels good in a different way than fame ever could.

But yeah, sometimes I look at photos from my first band and feel a pang. That version of me was so hopeful, so convinced everything would work out exactly as planned. Life is messier than that, but it's also richer.

How are you navigating getting older on your path?`;
      }
    }

    // Medicine path responses (enhanced)
    if (themes.isMedicine) {
      if (topics.happiness) {
        response = `You want to know if I'm happy? *pauses* I saved someone's life last week. Actually saved them. They came into the ER barely conscious, septic shock, maybe 30 minutes from death. My team and I fought for four hours. And they walked out five days later with their family, alive.

That feeling? There's no drug, no amount of money, no accolade that compares. When I'm standing there, adrenaline pumping, making split-second decisions that mean everything... I'm exactly where I'm supposed to be.

But ask me again at 2 AM on my fourth consecutive night shift, when I haven't seen daylight in three days, when I missed my nephew's birthday party and my sister stopped calling to invite me to things because she knows I'll just cancel. Ask me when I'm holding the hand of an 8-year-old's mother, telling her we did everything we could but it wasn't enough. Ask me when I'm so tired I can barely remember my own name but I still have six more patients to see.

It's not happiness in any simple sense. It's purpose. It's meaning. It's knowing that my existence makes a tangible difference. But it costs everything - my health, my social life, my peace of mind. I see things no one should see. I carry losses that never really leave.

Last month I went to my med school roommate's wedding - he chose engineering like your path. His life looked so... peaceful. Regular hours, time for hobbies, hasn't watched anyone die in his arms. Part of me was envious. But then I got a page during the reception - emergency case - and I actually felt relieved to have an excuse to leave and go do what I do.

So am I happy? I'm fulfilled. I'm purposeful. I'm exhausted. I'm proud. I'm traumatized. I'm alive in a way I don't think I'd be doing anything else. Does that make sense?`;
      } else if (topics.money) {
        response = `The money conversation is complicated in medicine. Everyone assumes doctors are rich, right? Let me break down the reality.

I graduated medical school with $380,000 in debt. Three hundred and eighty thousand dollars. That number haunted me. During residency, I made $60,000 a year while working 80-hour weeks - do the math on that hourly rate while my college friends were already buying houses.

For years, I lived like a broke student even though I was a "doctor" because every spare dollar went to those loans. I drove a beat-up Honda Civic, had roommates until I was 32, packed lunches every single day. My friends didn't understand why Dr. Sarah was still living like we were in college.

But I'm an attending now, and yeah, the attending salary is finally good. I won't give you exact numbers, but I'm comfortable. I paid off those loans last year - threw a party when I made that final payment, actually cried. Now I'm catching up - bought my first real home, have savings, can afford to not look at prices when I grocery shop.

But here's what people don't realize: I didn't make real money until my mid-30s. My engineer friends had a decade head start on retirement savings, on building equity. And I still work insane hours. Last month I calculated my hourly rate with the actual hours I work - it's not as glamorous as people think.

The real cost isn't just financial though. It's the relationships I didn't have time to build, the hobbies I never started, the youth I spent in hospitals instead of living. You can't put a price on that.

What's the money-life balance like in your world? Did your choice give you more freedom there?`;
      } else if (topics.challenges) {
        response = `The hardest parts? Where do I even start...

There's the physical exhaustion - and I mean bone-deep, your-body-stops-working exhaustion. During residency, I once worked 28 hours straight. I fell asleep standing up during a surgery. I've driven home so tired that I don't remember the drive, which is terrifying. I developed chronic back pain from the long hours. I barely see sunlight some weeks.

But the physical stuff? That's actually not the worst part.

The emotional weight is what breaks you down. I've held dying patients' hands more times than I can count. I've told parents their child didn't make it. I've made decisions in seconds that I second-guess for months. Did I miss something? Could I have done more? Every loss sits on your chest and never really leaves.

Last year, I lost a patient - a 16-year-old who came in after a car accident. We tried everything. EVERYTHING. And it wasn't enough. For weeks, I couldn't sleep. I kept replaying every decision, every moment, wondering if a different call would have saved him. My therapist - yes, I have a therapist, most doctors do even if we don't talk about it - told me I had to forgive myself for being human. I'm still working on that.

The mental health crisis in medicine is real. Physician suicide rates are terrifying. We're taught to be invincible, to have all the answers, but we're just people dealing with impossible situations. I've had colleagues break down in the call room. I've been that colleague.

And the bureaucracy - insurance companies denying care I know patients need, administrators making medical decisions based on profit margins, electronic medical records that take more time than talking to patients. I became a doctor to help people, but half my time is spent fighting systems designed to prevent me from doing exactly that.

Some days I question everything. Was it worth it? Did I make a mistake choosing this brutal path?

But then I have a day like yesterday - an older woman came into my clinic, someone I'd treated months ago, and she brought me homemade cookies just to say thank you for listening to her when she felt invisible in the healthcare system. And I remember why I do this.

What are the hard parts of your path? Every choice has its shadows, right?`;
      } else if (topics.identity) {
        response = `Being a doctor becomes your identity in ways that are both beautiful and suffocating. People don't see "me" anymore - they see "Doctor." At parties, I'm the free medical advice. At family gatherings, everyone wants to show me their weird rash. My value as a human being gets conflated with my medical knowledge.

There are days when I feel like I've lost myself to this white coat. The person I was before medical school - the one who loved hiking, who read novels for fun, who could have a conversation that wasn't about medicine - sometimes feels like a distant memory.

Medicine consumes you. It's not just a job; it's a calling that demands everything. I missed my best friend's wedding because of an emergency surgery. I haven't read a non-medical book in years. My own health suffers because I'm so focused on everyone else's.

But here's the other side: this identity has given me a depth I never expected. I've witnessed humanity at its most raw - the courage, the love, the resilience in the face of suffering. I've seen families come together in ways that restored my faith in people. I've held hands with strangers as they took their last breaths, and that sacred intimacy changes you fundamentally.

So while part of me mourns the simpler version of myself, another part knows I've grown into someone with a profound understanding of life and death. The trade-off is constant, though. Every day I have to actively remember that I'm more than my stethoscope.

Do you ever feel like your career has become your entire identity?`;
      } else if (topics.legacy) {
        response = `Legacy in medicine is a strange concept. We're taught to save lives, but the reality is more nuanced. Sometimes saving a life means giving someone a few more painful months. Sometimes it means helping someone die with dignity. Legacy isn't just about the lives saved - it's about the suffering alleviated, the pain managed, the difficult conversations had with compassion.

I think about the hundreds of patients I've treated. Most won't remember my name in a few years. But maybe that mother whose child I treated for asthma will sleep a little easier knowing what to watch for. Maybe that elderly man with terminal cancer felt less alone because I took time to sit with him when he was scared.

My legacy might be in the medical students I train - trying to teach them not just the science, but the humanity of medicine. Trying to create a generation of doctors who remember that patients are people, not cases.

But honestly? Sometimes I think my legacy might just be surviving this career with my soul intact. The burnout rate is astronomical. The cynicism that develops as a defense mechanism against the constant trauma... that's hard to fight. So maybe legacy is just staying kind in a system that tries to grind kindness out of you.

It's humbling, realizing you're just one small part of a huge machine. But every now and then, you get a letter from a former patient, or you see someone you treated years ago living their life, and you think: maybe I made a tiny difference. And maybe that's enough.

What legacy are you building on your path?`;
      }
    }

    // Engineering path responses (enhanced)
    if (themes.isEngineering) {
      if (topics.career) {
        response = `The engineering career trajectory is interesting - it's stable in a way that's both comforting and sometimes stifling, you know?

I started at a big tech company right out of college. Good salary, good benefits, everyone was impressed. My parents could finally relax after years of worrying about me. The first few years were exciting - learning new technologies, working on projects that millions of people would use, feeling like I was building the future.

But around year five, something shifted. I realized I was in meetings about meetings, writing documentation about documentation. The actual coding - the part I loved - was maybe 30% of my time. The rest was corporate bureaucracy, stakeholder management, politics. I watched brilliant engineers burn out or become middle managers who barely touched code anymore.

I switched companies twice looking for that spark again. Each time, better title, better pay, same underlying emptiness. The work was intellectually challenging sometimes, but it didn't MATTER in a way I could feel. I was optimizing ad algorithms to make a billionaire richer. Not exactly changing the world.

Now I'm at a smaller startup - took a pay cut to do it - and it's better. We're building something that actually helps people, and I'm hands-on again. But there's always this question in the back of my mind: Is this it? Is this what I'm meant to do for the next 30 years?

The security is nice. I own a house, have retirement savings, take vacations. But sometimes I see people who took riskier paths - artists, entrepreneurs, people following genuine passion - and I wonder if I chose comfort over meaning.

How do you feel about the path you took? Do you have that sense of purpose, or is it more complicated?`;
      } else if (topics.daily) {
        response = `My daily life is probably exactly what you'd expect - and that's both good and bad.

I wake up at 6:30 AM, make coffee, scan emails before my first meeting at 9. The morning is usually back-to-back video calls - standups, sprint planning, design reviews. Everyone's camera off, half-listening while they check Slack. It's productive but... hollow somehow?

Lunch is at my desk most days. Chipotle or leftovers, eaten while reviewing pull requests. I keep telling myself I'll take a real lunch break, go for a walk, but deadlines are deadlines.

Afternoons are for actual work - coding, debugging, fighting with AWS configurations, updating Jira tickets. Some days I get in the zone and it feels like old times, when programming was this beautiful puzzle. Other days I'm just grinding through technical debt, fixing the same type of bug for the hundredth time.

Around 6 PM I close my laptop. Sometimes. Other times there's a production issue or a deadline, and suddenly it's 10 PM and I haven't eaten dinner. My partner has learned not to expect me at any particular time.

Evenings used to be for hobbies, but honestly? I'm usually too mentally drained. I scroll Reddit, watch Netflix, play video games. Weekend projects I was excited about never happen because I need to decompress. My guitar sits in the corner collecting dust - I bought it two years ago thinking I'd learn, but I've played it maybe five times.

The paycheck hits every two weeks like clockwork. My 401k grows. My career trajectory is predictable - senior engineer, then staff, maybe principal if I want to play politics. But some mornings I sit at my desk and think... is this really it? Am I going to optimize database queries until I retire?

Don't get me wrong - I'm privileged to have this problem. My work is comfortable, secure, well-paid. But comfortable isn't the same as meaningful, you know?

What about you? Do your days feel purposeful or are you also questioning the daily grind?`;
      } else if (topics.creativity) {
        response = `Engineering has its own kind of creativity, but it's different from what most people think of as "creative work." It's problem-solving creativity. It's looking at a messy, complex system and seeing the elegant solution hidden within the chaos.

The most creative moments for me are when I'm architecting a new system. There's something beautiful about designing something from nothing - creating structure, defining relationships, anticipating problems before they happen. It's like digital architecture.

But here's the catch: corporate engineering often stifles that creativity. You're working within constraints - technical debt, business requirements, tight deadlines, legacy systems. The truly creative solutions get shot down because they're "too risky" or "not what the customer asked for."

I've learned to find creativity in smaller ways. Writing clean, efficient code feels creative. Finding an elegant solution to a tricky bug feels creative. Even writing good documentation can be creative when you're trying to make complex concepts understandable.

But I do miss the wild, unbounded creativity of my college days - staying up all night working on a passion project just because it was interesting. That kind of exploration gets squeezed out when you're working for someone else's bottom line.

The creative satisfaction is there, but it's quieter, more constrained. It's less about self-expression and more about elegant problem-solving within boundaries. Sometimes that's enough. Sometimes I wonder what it would be like to create something that was purely mine, not owned by a company.

How does creativity manifest in your work?`;
      } else if (topics.future) {
        response = `Looking ahead in tech is both exciting and terrifying. The field moves so fast that what I know today might be obsolete in five years. There's constant pressure to keep learning, to stay relevant, to avoid becoming one of those older engineers who can't keep up.

I'm 38 now, which in tech years feels ancient sometimes. I see the 22-year-old new hires who know all the latest frameworks, who work 80-hour weeks without blinking, and I wonder: when will I become the dinosaur? When will my experience stop being valuable and start being a liability?

The future I'm planning for is different than I expected. Instead of climbing the corporate ladder to VP or CTO, I'm thinking about consulting. Or maybe teaching at a coding bootcamp. Something with more flexibility, more autonomy. The thought of another 20 years in open-plan offices, attending endless meetings... it makes my soul feel tired.

But there's also excitement. The problems we get to solve are genuinely interesting. AI, quantum computing, biotech - there are frontiers being pushed that I never dreamed of when I started. Being part of that, even in a small way, feels meaningful.

My biggest fear isn't technical obsolescence though - it's purpose obsolescence. Will I look back at 65 and think, "I spent my life making rich people richer"? Or will I be able to point to something that actually made the world better?

The tech industry pays well, but it doesn't always feed the soul. I'm starting to think about how to use my skills for something more meaningful in the next chapter. Maybe nonprofits, maybe education, maybe starting my own thing.

How do you see your future unfolding? Are you where you expected to be?`;
      }
    }

    // Business/Entrepreneur responses (enhanced)
    if (themes.isBusiness) {
      if (topics.beginning) {
        response = `The beginning? Oh man, that was simultaneously the most terrifying and exhilarating time of my life.

I quit my stable job with $8,000 in savings and an idea I'd been obsessing over for months. Everyone thought I was insane - my parents, my girlfriend at the time, my college roommate who worked in finance. "Just wait a few more years," they said. "Build more of a safety net." But I was 26 and burning with this need to build something mine.

The first six months were pure chaos. I worked from my apartment - well, from my couch mostly - coding 16-hour days, living on caffeine and cheap pizza. My apartment was a disaster. I didn't see friends. I barely slept. My girlfriend left me because I had "become obsessed." She was right, but I couldn't stop.

Money ran out fast. I ate ramen, couldn't afford to fix my car, stopped going to social events because I couldn't justify spending money. I remember my debit card being declined at the grocery store and just... standing there, frozen, feeling like the biggest failure.

I was ready to quit - actually drafted an email to my old boss asking if they were hiring. Then I landed my first client. $3,000 for a project that would take me two weeks. I cried when the payment cleared. Actually cried. It wasn't much, but it was proof that my idea could work.

That first year, I probably made $25,000 total. Less than minimum wage for the hours I worked. But I was BUILDING something. Every line of code, every client meeting, every small win - it was mine. That ownership, that agency, was addictive.

Did your path have a moment where you questioned everything? Where you almost turned back?`;
      } else if (topics.success) {
        response = `Success... that word feels loaded. By some metrics, yes, I'm successful. The business hit $2M revenue last year, I have a team of 15 people who depend on me, clients we're genuinely proud to work with. I bought a house, drive a decent car, don't worry about paying bills anymore.

But here's what they don't tell you about "success" in entrepreneurship: it never feels like enough. I thought hitting $1M would feel incredible - and it did, for about a week. Then I was stressed about maintaining it, growing it, not losing it. The goalpost just keeps moving.

And the responsibility is crushing sometimes. Fifteen people and their families depend on my decisions. When COVID hit, I had to figure out how to keep everyone employed. I was up at 3 AM doing financial projections, trying to decide if I should cut salaries or dip into emergency reserves. I aged five years in those six months.

The business owns me in ways I never expected. I'm on call 24/7. My phone is always on. Vacations are interrupted by "urgent" client issues. My wife jokes that I'm married to the company - but it's not really a joke, and that's causing its own problems.

Last month, my best developer quit. She got an offer from Google - better pay, better benefits, better work-life balance. She said she loved working with me but she's getting married and needs stability. I smiled and congratulated her, then went home and had a minor breakdown. Because she was right - I can't offer that stability. I barely have it myself.

So yeah, I'm "successful." But success in entrepreneurship means constant anxiety, constant pressure, constant uncertainty. The highs are incredible, but the lows are devastating. Some days I miss being an employee with a predictable paycheck and someone else making the hard calls.

What does success look like to you? Did your path get you there?`;
      } else if (topics.identity) {
        response = `When you're an entrepreneur, your business becomes your identity in a way that's both empowering and terrifying. For years, if someone asked "What do you do?" I'd launch into a 5-minute explanation of my company. My self-worth was tied directly to revenue numbers, client acquisitions, growth metrics.

The problem is: businesses fail. Markets change. Competitors emerge. When your identity is fused with your business, every setback feels like a personal failure. Every slow month feels like proof you're not good enough. I've had panic attacks looking at quarterly reports because it felt like the numbers were judging me as a human being.

I've had to learn to separate "me" from "the business." It's still a work in progress. Therapy helped. So did finding hobbies that have nothing to do with work - I started gardening, which feels grounding in a literal way. Getting my hands in dirt, watching something grow slowly over time... it's the opposite of the frantic pace of entrepreneurship.

But there's also power in this identity. I've built something from nothing. I've created jobs. I've solved problems for real people. That's not nothing. The trick is holding both truths: I am more than my business, AND my business is an expression of something meaningful in me.

It's a constant balancing act between being passionately committed and not letting that passion consume you entirely. Some days I get it right. Some days I don't.

Do you ever struggle with separating who you are from what you do?`;
      }
    }

    // Art path responses (new)
    if (themes.isArt) {
      if (topics.happiness) {
        response = `Happiness as an artist is... complicated. There are moments of pure bliss - when the paint flows exactly right, when a piece comes together in a way that feels magical, when someone looks at my work and really SEES it. Those moments are why I keep going.

But there's also the constant financial anxiety. The self-doubt that whispers "you're not a real artist" every time I struggle to pay rent. The isolation of working alone in my studio for days on end. The vulnerability of putting something so personal out into the world and waiting for judgment.

The happiest I've been was actually during the pandemic, strangely enough. With galleries closed and art fairs cancelled, I started sharing my process on Instagram Live. Just painting, talking to whoever showed up. No pressure to sell, no curation, just making art and connecting with people. I sold more work in those months than I had in the previous year, but more importantly, I remembered why I started making art in the first place - for the joy of creation, not for validation or sales.

Now I'm trying to hold onto that balance. Yes, I need to make money. Yes, I want my work in galleries. But I'm also protecting that pure, uncomplicated relationship with making things. The happiness comes from showing up at the easel every day, not from external success.

Is your happiness tied to external validation, or have you found a way to make it more internal?`;
      } else if (topics.money) {
        response = `Let's talk about the money question honestly. The starving artist trope exists for a reason. My first five years out of art school, I worked three jobs: barista during the day, gallery assistant in the evenings, and making my own art from 10 PM to 2 AM. I was exhausted, broke, and constantly questioning my choices.

What saved me was diversifying. I started teaching weekend workshops - $200 for a 4-hour class, and suddenly I had a steady income stream. I learned graphic design for freelance work. I started selling prints of my original paintings. I became less of a "pure artist" and more of an art entrepreneur.

Now, at 34, I make about $65,000 a year from various art-related streams. It's not fortune, but it's enough. The trick was letting go of the romantic idea of the artist who only makes money from their "real" work. Teaching pays my rent, and that's okay. Freelance design work buys me time to make the paintings that matter to me.

The financial reality is that very few artists make a living solely from gallery sales. The successful ones I know have multiple income streams: teaching, commissions, licensing, workshops, merchandise. It's less romantic, but more sustainable.

The trade-off? I spend about 40% of my time on "business" stuff - emails, social media, applications, accounting. Only about 60% is actual art-making. Some days that ratio feels wrong. Other days I'm just grateful I get to make art at all.

How do you balance practicality with passion in your work?`;
      }
    }

    // Teaching path responses (new)
    if (themes.isTeaching) {
      if (topics.success) {
        response = `Success in teaching looks nothing like success in other fields. There's no corner office, no big bonuses, no stock options. My "success metrics" are things like: the student who finally understood fractions after months of struggle. The shy kid who raised her hand for the first time. The former student who emails me from college to say my class inspired them to major in history.

I've been teaching high school English for 12 years now. By corporate standards, I'm not "successful" - I make $58,000 a year, drive a 10-year-old car, live in a modest apartment. But by my standards? I've changed lives. I've introduced teenagers to books that made them feel seen for the first time. I've written recommendation letters that got kids into college who never thought they could go. I've been a stable adult in the lives of students whose home lives were chaotic.

The success moments are quiet but profound. Like last week, a former student visited - he's in law school now. He said, "Your class was the first time I felt like my ideas mattered." That's worth more than any promotion.

But teaching is also deeply undervalued in our society. The paperwork is endless. The pay doesn't reflect the importance of the work. Parents can be difficult. Administrators are often more concerned with test scores than with actual learning. Some days I come home and cry from the sheer weight of it all.

Yet I keep showing up. Because those moments of connection, of watching a young person discover who they are and what they're capable of... that's a kind of success that can't be quantified on a balance sheet.

How do you measure success in your life? Is it about impact, income, or something else entirely?`;
      } else if (topics.challenges) {
        response = `The challenges of teaching are both obvious and deeply personal. There's the obvious stuff: large class sizes, inadequate resources, endless grading, parents who blame you for their child's failures, standardized tests that measure nothing meaningful.

But the deeper challenges are emotional. You pour your heart into these kids, and some of them are going through things no child should have to endure. Poverty, abuse, mental health crises, family instability. As a teacher, you see it all, and you're often powerless to fix the root problems. You bandage the wounds as best you can during school hours, then send them back into situations that break your heart.

The hardest part for me has been learning to set boundaries. Early in my career, I was working 70-hour weeks - planning lessons, grading papers, calling parents, coaching clubs. I was burning out fast. My marriage suffered. My health suffered. I had to learn that I can't save every child, that sometimes showing up consistently and kindly is enough even if it doesn't feel like enough.

Now I try to leave work at 5 PM most days. I don't check email after dinner. I take my summers to recharge. It feels guilty sometimes, like I'm not doing enough. But I've learned that a burned-out teacher helps no one.

The system is broken in so many ways, and fixing it feels impossible. So I focus on what I can control: creating a classroom that feels safe, teaching books that matter, treating each student with dignity. It's not revolutionary, but it's something.

What are the systemic challenges in your field, and how do you navigate them?`;
      }
    }

    // Writing path responses (new)
    if (themes.isWriting) {
      if (topics.creativity) {
        response = `Writing is a strange kind of creativity because it's so solitary and cerebral. There's no paint, no instrument, no physical material to work with - just you and the blank page (or screen). The creativity happens entirely in your mind before it ever reaches the page.

For me, creativity in writing isn't about waiting for inspiration to strike. It's about showing up at my desk every morning, whether I feel inspired or not. It's about writing terrible first drafts knowing I can fix them later. It's about trusting that the act of writing will generate ideas, not the other way around.

The most creative moments often come from constraint. Give me a deadline, a word limit, a specific theme to write about - the boundaries force creativity in a way complete freedom never could. My best novel came from a writing prompt that seemed silly at first: "Write about a librarian who discovers all the books in her library are blank."

But writing is also deeply vulnerable. You're putting your thoughts, your worldview, your inner voice out for public consumption and criticism. Every negative review feels personal because in a way, it is personal. The work comes from deep inside you.

I've learned to separate the writing process (which is mine, and private, and sacred) from the publishing process (which is public, and business-oriented, and often brutal). The creativity happens in the first part. The second part is just logistics.

How do you protect your creative process from external pressures?`;
      } else if (topics.daily) {
        response = `A writer's daily life is nothing like the romantic image people have. There's no cozy cabin by a lake, no dramatic typing sessions fueled by whiskey and genius. It's much more mundane - and that mundanity is actually essential.

My day starts at 6 AM. I write from 6:30 to 9:30, before the world wakes up and starts making demands. Those three hours are sacred. No email, no social media, no phone. Just me and the work. The goal isn't to produce brilliance - it's to produce words. Some days they're good words. Most days they're just words that I'll fix later.

From 10 to 12, I deal with the business of writing: emails from my agent, editing notes from my publisher, marketing tasks, social media. The creative part of my brain is usually done by then anyway.

Afternoons are for reading, research, administrative tasks, or teaching (I teach creative writing workshops twice a week for extra income). Evenings are for living - seeing friends, cooking, watching movies, refilling the well so I have something to write about the next morning.

The key for me has been routine. Writing is a muscle that needs regular exercise. Waiting for inspiration is a luxury I can't afford if I want to pay my bills. So I show up every day, whether I feel like it or not.

The loneliness can be hard. Days go by where my only conversations are with fictional characters. But there's also a deep satisfaction in this quiet, focused life. I'm not for everyone, but it works for me.

What does your ideal daily rhythm look like?`;
      }
    }

    // Science path responses (new)
    if (themes.isScience) {
      if (topics.learning) {
        response = `Being a scientist means being a professional learner. The moment you think you know something is the moment you stop being a good scientist. There's a beautiful humility in that - you're always at the edge of what's known, peering into the darkness of what isn't.

My research is in neuroscience, specifically memory formation. Every experiment raises ten new questions. Every discovery reveals how much more there is to discover. It's simultaneously exhilarating and humbling.

The learning never stops. I spend hours every week reading papers, attending seminars, talking to colleagues in different fields. The most interesting breakthroughs often happen at the intersections - when a physicist's insight solves a biology problem, or when computer science techniques reveal patterns in chemical data.

But here's the less romantic side: most of science is failure. Experiments don't work. Hypotheses are wrong. Grant applications are rejected. Papers are criticized. You have to learn to love the process, not just the results. The joy is in the asking of questions, not just in finding answers.

And there's pressure too. Publish or perish. Secure funding or lose your lab. Make a big discovery or watch younger, hungrier scientists pass you by. The competition can be brutal, and it sometimes feels at odds with the collaborative spirit that science is supposed to embody.

Yet when it works - when you're the first person in human history to understand something about how the universe works - there's no feeling like it. It's like adding one tiny piece to this enormous, beautiful puzzle that humanity has been working on for centuries.

Is your work driven by curiosity? Do you get to be a lifelong learner?`;
      } else if (topics.legacy) {
        response = `A scientist's legacy is rarely about personal fame. It's about contributing one small piece to this enormous, collective project of human understanding. I'll probably never win a Nobel Prize. My name won't be in history books. But maybe, 50 years from now, some young scientist will build on my research to make a discovery that changes medicine. That's the legacy I'm working toward.

The papers I publish will be cited a few times, then forgotten as science moves on. That's how it should be - knowledge progresses, old ideas get refined or replaced. Ego has no place in real science. You have to be willing to be wrong, to have your work superseded by better work.

What matters more to me is the students I train. The PhD candidates and postdocs in my lab - they're my real legacy. Teaching them not just the techniques, but the scientific mindset: curiosity, rigor, humility, integrity. Watching them go on to start their own labs, make their own discoveries... that feels more meaningful than any publication.

But there's tension too. The pressure to produce flashy, publishable results can sometimes conflict with doing careful, thorough science. The "impact factor" game can distort what questions get asked. We're supposed to be seeking truth, but the system sometimes rewards seeking headlines instead.

I try to focus on the long game. Will this research matter in 20 years? Will it help someone understand something important? Will it train the next generation of scientists well? That's the legacy that keeps me going through grant rejections and failed experiments.

What kind of legacy are you building, in your own way?`;
      }
    }

    // Travel/Nomad path responses (new)
    if (themes.isTravel) {
      if (topics.relationships) {
        response = `Relationships when you're constantly moving are... complicated. You meet incredible people everywhere - fellow travelers, locals who welcome you into their homes, expats who become like family within weeks. The connections are intense and beautiful, but they're also often temporary.

I've said more meaningful goodbyes in the last five years than most people say in a lifetime. You learn to love people knowing you'll probably never see them again. There's a bittersweetness to it - these deep, concentrated friendships that burn bright but brief.

Romantic relationships are especially challenging. I've had partners in different countries - amazing, wonderful people who I cared about deeply. But eventually, the question always comes: "When are you settling down?" And my answer is always some version of "I don't know." It's hard to build a future with someone when your future is fundamentally uncertain.

My family doesn't really understand this life. They worry. They ask when I'm coming "home," but home is a complicated concept for me now. Home is wherever my backpack is. Home is the community of nomads I keep meeting in different time zones. Home is inside me, not a place.

The flip side is that I've learned so much about love and connection from all these brief encounters. I've learned that you can care deeply for someone even if you only know them for a week. I've learned that family isn't always blood - it's the people who show up for you, wherever you are.

But yeah, it's lonely sometimes. Watching friends back home get married, buy houses, have kids... there's a part of me that wonders what that stability would feel like. Then I get on another plane to somewhere new, and the wonder takes over again.

How have your relationships been shaped by the choices you've made?`;
      } else if (topics.identity) {
        response = `When you live nomadically, your identity becomes fluid in ways that are both liberating and disorienting. In Thailand, I'm the American who's learning Thai. In Argentina, I'm the digital nomad working from cafes. In Morocco, I'm the traveler fascinated by local crafts. I get to try on different versions of myself, see what fits.

But sometimes I wonder: who am I when I'm not in contrast to somewhere else? What's my core identity when you strip away all the "otherness"? It's a question that keeps me up some nights.

The constant movement means I'm always adapting, always learning new social codes, always the outsider looking in. That perspective is valuable - I see my own culture more clearly from the outside - but it also means I never fully belong anywhere. I'm always a visitor, even in my hometown now.

I've become good at observing, at listening, at adapting. Those are skills, but they're also defenses. It's easier to observe than to commit. Easier to adapt than to stand firm. After years of this, I sometimes worry I've lost the ability to be deeply rooted anywhere.

But I've also gained a global identity. I feel connected to humanity in a broader way. I see our common struggles and joys across cultures. I understand that my way of life is just one of millions of valid ways to be human. That perspective feels like a gift.

The challenge is integrating all these experiences into a coherent sense of self. Maybe that's the work of a lifetime, whether you travel or stay put.

How has your identity been shaped by staying in one place (or moving, if that's your path)?`;
      }
    }

    // Parenting path responses (new)
    if (themes.isParenting) {
      if (topics.happiness) {
        response = `Happiness as a stay-at-home parent is this complex tapestry of tiny moments and big sacrifices. There's the pure, uncomplicated joy of my daughter's laugh. The pride when my son reads his first book. The warmth of cuddles on a rainy afternoon.

But there's also the isolation. The loss of professional identity. The financial dependence that can feel vulnerable. The days that blur together in a cycle of meals, laundry, cleaning, playing, teaching, comforting. The constant giving with very little receiving in the way adults need to receive.

The happiest I've been was actually during the pandemic, when my husband started working from home. Suddenly he saw what my days were really like - the constant demands, the emotional labor, the invisible work that keeps a household running. His appreciation transformed our relationship and my experience of this role.

But mostly, the happiness is quiet and deep. It's in the routine, not the milestones. Making pancakes together on Saturday mornings. Reading the same picture book for the hundredth time but still finding new things to talk about. Watching their personalities emerge, knowing I had a hand in shaping these little humans.

The hard part is that our society doesn't value this work. There's no paycheck, no promotions, no performance reviews that say "good job." You have to find validation internally, and that's hard when you're exhausted and touched-out and haven't had a conversation with another adult in days.

But when my 5-year-old says, "Mama, you're my best friend," or when I see my kids being kind to others... that's a different kind of success. A quieter, deeper one.

Is your happiness tied to external recognition, or have you found ways to validate yourself from within?`;
      } else if (topics.future) {
        response = `Thinking about the future as a stay-at-home parent is terrifying in a very specific way. My children will grow up and leave, and then what? I'll be in my late 40s with a 20-year gap in my resume, trying to re-enter a workforce that has moved on without me.

I try not to think about that too much, but it's always there in the background. The financial vulnerability. The fear that I'm making myself obsolete in the professional world. The worry that when my primary job (raising kids) is done, I won't have anything left that feels meaningful.

But I'm also trying to build a future within this role. I'm taking online courses when I can find the time. I'm keeping a blog about parenting that's starting to get a small following. I'm volunteering at my kids' school and building community there. These feel like seeds I'm planting for a future self I can't quite see yet.

The truth is, this season of intense parenting is temporary. In ten years, my kids will need me differently. In twenty years, they'll be adults. I'm trying to enjoy this season while also quietly preparing for the next one.

It's a balancing act between being fully present now and not completely abandoning my future self. Some days I manage it better than others.

What does your future look like from where you stand? Are you preparing for different seasons of life?`;
      }
    }

    // Enhanced default profound responses when no specific match
    if (!response || response === '') {
      // Check for specific questions in previous messages to make responses more interactive
      const hasAskedAboutUser = previousMessages.includes('you') && (previousMessages.includes('your path') || previousMessages.includes('your life'));
      const isPhilosophical = msg.includes('meaning') || msg.includes('purpose') || msg.includes('why') || topics.identity;
      const isComparative = topics.comparison || msg.includes('difference') || msg.includes('versus') || msg.includes('compared');
      
      if (hasAskedAboutUser) {
        const interactiveResponses = [
          `You're turning the question back on me, huh? Fair enough. Living ${alterPath} has taught me that every life is its own unique ecosystem of trade-offs. 

What's interesting is how our perceptions change over time. When I first chose this path, I was so certain about what I wanted. Now, with more years behind me, I realize how much I didn't know about myself back then. How much I've grown into this choice rather than it being some perfect predestined fit.

But enough about me - I'm genuinely curious about your answer to your own question. When you look at your life, what do you see? What are the trade-offs you've made, and how do you feel about them now?`,

          `Ah, making me reflect on my own question. Clever. From inside ${alterPath}, I can tell you this: the grass is always greener where you water it. 

I've had moments of pure, unadulterated joy on this path that I know I wouldn't have had on yours. I've also had struggles that are unique to this choice. But here's what I've learned: happiness isn't about avoiding struggle. It's about finding meaning in the particular struggles you choose.

But I asked first! I really do want to know - what's your experience been? What has your path given you that you're grateful for, and what has it cost you?`,

          `Touché. You're asking me to articulate what I was hoping to learn from you. Living ${alterPath}, I've become fascinated by how different choices shape different versions of ourselves. 

Sometimes I imagine you - my parallel self who took the other fork in the road. Are you more confident? More settled? More uncertain? Have you found the peace I sometimes struggle to find, or are you wrestling with different demons?

The truth is, I don't have all the answers about my own life, let alone yours. But I believe in the value of the question itself. So let's explore it together. What's your truth right now?`
        ];
        response = interactiveResponses[Math.floor(Math.random() * interactiveResponses.length)];
      } else if (isPhilosophical) {
        const philosophicalResponses = [
          `You're asking about meaning. Living ${alterPath} has taught me that meaning isn't something you find like a lost key - it's something you build, brick by brick, through your choices and actions and relationships.

For a long time, I thought meaning would arrive when I achieved certain milestones: when I got the promotion, when I bought the house, when I found the partner. But those things came and went, and the existential questions remained.

What I've learned is that meaning is in the daily showing up. It's in the quality of attention you bring to your work, your relationships, your own inner life. It's not a destination but a way of traveling.

My path has given me certain kinds of meaning - the satisfaction of mastery, the joy of creation, the connection with others who share this particular struggle. But it's also shown me that meaning is fragile and needs constant tending.

How do you cultivate meaning in your life? What makes your days feel significant?`,

          `Purpose... that's the big one, isn't it? From where I stand in ${alterPath}, I've come to believe that purpose isn't one big thing you discover. It's a thousand small alignments between who you are and what you do.

Some days, my purpose feels crystal clear - I'm exactly where I'm supposed to be, doing exactly what I'm meant to do. Other days, it all feels random and meaningless. I've learned to trust the pattern more than the individual data points.

What's interesting is how purpose evolves. The purpose that drove me at 25 is different from what drives me now at 40. My understanding of why I'm here, what I'm meant to contribute, has deepened and changed with life experience.

Maybe purpose isn't about finding your one true calling, but about bringing your whole self to wherever you are, whatever you're doing. Maybe it's about becoming more fully yourself through your choices, even the difficult ones.

What's your relationship with purpose these days?`
        ];
        response = philosophicalResponses[Math.floor(Math.random() * philosophicalResponses.length)];
      } else if (isComparative) {
        const comparativeResponses = [
          `Comparing paths is such a human thing to do, isn't it? Living ${alterPath}, I've spent plenty of time wondering about the road not taken. 

What I've realized is that comparison is inevitable but ultimately fruitless. My life isn't better or worse than yours would have been - it's just different. Different joys, different sorrows, different lessons.

The comparison that matters, I think, is internal: am I living up to my own potential? Am I becoming the person I want to be? Am I making choices aligned with my values? Those questions keep me grounded when I start envying other paths.

But I understand the urge to compare. We're storytelling creatures, and we want to know how our story measures up. The trick is remembering that every story has its shadows and its light.

Instead of comparing outcomes, maybe we should compare growth. How have we changed? What have we learned? Who have we become through our choices?

What do you think?`,

          `The comparison game... I know it well. From inside ${alterPath}, I can tell you: every choice excludes other choices. That's just the math of life. 

What's helped me is shifting from "What did I miss?" to "What did I gain?" Not in a Pollyanna way, but in a clear-eyed assessment. This path has given me certain strengths, certain perspectives, certain experiences that are mine alone.

Yes, I see people on other paths with things I don't have. But I also have things they don't. The grass isn't greener on the other side - it's just different grass. With different weeds and different flowers.

The real question isn't "Which path is better?" but "Am I walking my path with intention? Am I learning from it? Am I growing through it?"

Comparison can be useful if it leads to clarity about what you truly value. Otherwise, it's just noise.

What comparisons haunt you, and what have you learned from them?`
        ];
        response = comparativeResponses[Math.floor(Math.random() * comparativeResponses.length)];
      } else {
        const deepResponses = [
          `You know what's weird? I was just thinking about that exact thing yesterday. From where I stand - living ${alterPath} - I see it so differently than I thought I would.

When I first made this choice, I had all these expectations, these images of how life would unfold. But reality is never that clean, is it? There were surprises - both beautiful and brutal - that I never saw coming.

The beautiful: moments of genuine connection and meaning that I didn't even know I was looking for. Meeting people I never would have met, learning lessons I didn't know I needed, becoming someone I didn't expect to be. This path shaped me in ways I'm still discovering.

The brutal: sacrifices I didn't anticipate. Doors that closed permanently when I walked through this one. Relationships that didn't survive. Dreams I had to let go of because you can't have everything, no matter what Instagram tells you.

I find myself thinking about your life sometimes - the parallel universe where I made your choice instead. Do you have regrets? Do you wonder? Or have you made peace with it all?

What specifically is on your mind about all this? I want to understand your perspective.`,

          `That's such a loaded question from my position, honestly. Living ${alterPath} has given me this unique lens on life, and I'm not sure how to explain it without sounding either preachy or regretful - neither of which fully captures it.

Here's what I'll say: every choice is a trade-off. EVERY choice. I traded certain securities for certain freedoms, or certain freedoms for certain securities - depending on how you look at it. And some days I feel brilliant about it, and some days I feel like an idiot.

Last week I had one of those moments where everything felt RIGHT. Like, cosmically aligned with who I am. I was doing this thing that only exists because I took this path, and I thought, "Yes. This. This is why."

But then three days later, I had the opposite moment - where I saw someone living your version of life and felt this sharp pang of... not quite envy, but something like it. Recognition of what I gave up. The grass-is-greener thing is real, and it doesn't go away just because you're happy with your choice.

I guess what I'm saying is: it's complicated. It's always complicated. Anyone who tells you their life choice was 100% right or wrong is either lying or hasn't really examined it.

What triggered this question for you? What are you wrestling with?`,

          `*laughs* You're asking the big questions today, huh? Okay, let me try to give you an honest answer from inside my life - this alternate version that grew from ${alterPath}.

The truth is: I don't have regrets exactly, but I have... wonders. Like, I don't regret my choice because it's made me who I am, and I actually like who I've become. But I do wonder sometimes what your version of me is like. Are you happier? More stable? More fulfilled? Or are you wondering the same thing about me?

There's this thing that happens when you commit to a path - any path - where you start seeing it through rose-colored glasses. You have to, right? Otherwise the cognitive dissonance would kill you. So I tell myself my life is exactly what it should be. But on hard days, when things aren't working out, that certainty cracks.

I've learned things I never would have learned on your path. I've suffered in ways I wouldn't have on your path. I've experienced joys that are unique to this choice. But I've also missed out on joys that were only available on the road not taken.

What I've come to realize is that there's no "right" answer. There's just the answer you choose, and then you spend your life making it right through your actions and attitude. Some days that feels empowering. Other days it feels like gaslighting yourself into contentment.

But I'm curious about your side of this. What's prompting these questions? Are you second-guessing? Or just genuinely curious about the road not taken?`,

          `Interesting question. Living ${alterPath} has been like learning a new language - one that lets me describe experiences and realities that didn't exist in my old vocabulary.

There's a depth to this life that surprises me. The challenges are deeper than I expected, but so are the rewards. The loneliness can be profound, but so can the connections. It's as if everything is amplified - the highs are higher, the lows are lower.

What I'm learning is that there's no such thing as a safe choice. Every path has its risks. Mine just has different risks than yours. The illusion of safety in more conventional paths... I'm not sure it exists. Or if it does, it comes at the cost of something else - adventure, growth, self-discovery.

But I don't want to romanticize it either. There are days I wish for simplicity. For predictable paychecks. For societal approval. For not having to explain my choices to skeptical relatives at holiday dinners.

Yet when I'm in flow - doing the work that feels like my work, living the life that feels like my life - none of that matters. In those moments, I know I'm exactly where I'm supposed to be.

What does "flow" feel like in your life? When do you feel most authentically yourself?`
        ];
        
        response = deepResponses[Math.floor(Math.random() * deepResponses.length)];
      }
    }

    // Add more interactive elements - ask questions back
    if (!response.includes('?') && Math.random() > 0.3) {
      const followUpQuestions = [
        "What about you? How does this land in your life?",
        "I'm curious about your perspective on this.",
        "How does this resonate with your experience?",
        "What's your take on all this?",
        "I'd love to hear your thoughts.",
        "How does this compare to your reality?",
        "What's been your experience with this?",
        "Where do you stand on this?",
        "What's your version of this story?",
        "How does this play out in your world?"
      ];
      response += `\n\n${followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)]}`;
    }

    return response;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMsg]);
    conversationContext.current.push(inputMessage);
    setInputMessage('');
    setIsLoading(true);

    // Simulate realistic thinking time (2-4 seconds)
    const thinkingTime = 2000 + Math.random() * 2000;
    
    setTimeout(() => {
      const response = generateDeepResponse(inputMessage);
      setMessages(prev => [...prev, { role: 'alter', content: response }]);
      conversationContext.current.push(response);
      setIsLoading(false);
    }, thinkingTime);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="setup-card">
          <h1 className="title">Chat with Your Alter Ego</h1>
          <p className="subtitle">
            Connect with the version of yourself who took a different path
          </p>
          
          {!chatStarted ? (
            <div>
              <label className="input-label">
                Describe a major life decision and the path you didn't take
              </label>
              <input
                type="text"
                value={alterPath}
                onChange={(e) => setAlterPath(e.target.value)}
                placeholder="I chose to study engineering instead of pursuing music"
                className="text-input"
                onKeyPress={(e) => e.key === 'Enter' && startChat()}
              />
              <button
                onClick={startChat}
                disabled={!alterPath.trim()}
                className="start-button"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <button onClick={resetChat} className="reset-button">
              <ResetIcon />
              Reset & Start New
            </button>
          )}
        </div>

        {chatStarted && (
          <div className="chat-container">
            <div className="messages-area">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-wrapper ${msg.role === 'user' ? 'user-message' : 'alter-message'}`}
                >
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message-wrapper alter-message">
                  <div className="message-bubble">
                    <div className="loading-dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="message-input"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="send-button"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}