(function (global) {
  "use strict";

  const SOURCES = {
    state2025: "https://www.stateof.ai/",
    state2024: "https://www.stateof.ai/2024",
    state2023: "https://www.stateof.ai/2023",
    predictions: "https://www.stateof.ai/predictions",
    accuracy: "https://www.stateof.ai/predictions/how-accurate-is-the-state-of-ai-report",
    visionTransformer: "https://research.google/pubs/an-image-is-worth-16x16-words-transformers-for-image-recognition-at-scale/",
    nvidiaArm: "https://nvidianews.nvidia.com/news/nvidia-and-softbank-group-announce-termination-of-nvidias-acquisition-of-arm-limited",
    microsoftOpenAI: "https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/",
    cmaOpenAI: "https://www.gov.uk/cma-cases/microsoft-slash-openai-partnership-merger-inquiry",
    ftcAIInquiry: "https://search.ftc.gov/news-events/news/press-releases/2024/01/ftc-launches-inquiry-generative-ai-investments-partnerships",
    deepseekR1: "https://arxiv.org/abs/2501.12948",
    recursionIPO: "https://ir.recursion.com/news-releases/news-release-details/recursion-pharmaceuticals-announces-pricing-initial-public",
    recursionValuation: "https://www.cbinsights.com/company/recursion-pharmaceuticals/financials",
    exscientiaValuation: "https://www.theguardian.com/business/2021/oct/01/welsh-scientist-makes-potential-539m-fortune-from-biotech-flotation-in-us",
    anthropicSeriesC: "https://www.anthropic.com/news/anthropic-series-c",
    shutterstockOpenAI: "https://investor.shutterstock.com/news-releases/news-release-details/shutterstock-expands-partnership-openai-signs-new-six-year",
    bletchleyDeclaration: "https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration",
    seoulDeclaration: "https://www.gov.uk/government/publications/seoul-declaration-for-safe-innovative-and-inclusive-ai-ai-seoul-summit-2024/seoul-declaration-for-safe-innovative-and-inclusive-ai-by-participants-attending-the-leaders-session-ai-seoul-summit-21-may-2024",
    aiScientist: "https://sakana.ai/ai-scientist-first-publication/",
    aiCoScientist: "https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/",
    virtualLab: "https://med.stanford.edu/news/all-news/2025/07/virtual-scientist.html",
    alphaEvolve: "https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/",
    aiActionPlan: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf?inline=1",
    gptOss: "https://openai.com/index/introducing-gpt-oss/",
    reflectionAI: "https://techcrunch.com/2025/10/09/reflection-raises-2b-to-be-americas-open-frontier-ai-lab-challenging-deepseek/",
    stanfordAI2025: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    stanfordAI2026Performance: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
    artificialAnalysisChina: "https://artificialanalysis.ai/downloads/china-report/2025/Artificial-Analysis-State-of-AI-China-Q2-2025-Highlights.pdf",
    artificialAnalysisModels: "https://artificialanalysis.ai/leaderboards/models",
    lmarena: "https://lmarena.ai/leaderboard",
    lbnlDataCenters: "https://energyanalysis.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report",
    doeDataCenters: "https://www.energy.gov/oe/clean-energy-resources-meet-data-center-electricity-demand",
    vpmVirginia: "https://www.vpm.org/elections/2025-10-28/election-2025-data-centers-earle-sears-spanberger-dominion-clean-virginia",
    georgiaPSC: "https://www.bisnow.com/atlanta/news/energy/data-centers-may-have-partially-influenced-democrat-psc-wins-131748",
    tucsonProjectBlue: "https://azluminaria.org/2025/08/06/tucson-city-council-rejects-project-blue-amid-intense-community-pressure/",
    sagAftraAI: "https://www.sagaftra.org/contracts-industry-resources/contracts/2023-tvtheatrical-contracts/artificial-intelligence-resources",
    sagTilly: "https://variety.com/2025/film/news/sag-aftra-tilly-norwood-ai-actress-1236534779/",
    critterzCannes: "https://deadline.com/2026/05/open-ai-produced-animated-family-film-critterz-cannes-1236879586/",
    wgaAI: "https://www.wga.org/uploadedfiles/contracts/2023_mba_moa.pdf",
    c2pa: "https://c2pa.org/specifications/specifications/2.2/explainer/Explainer.html",
    humanoidsAssessment: "https://www.gov.uk/government/publications/rapid-technology-assessment-humanoids/rta-humanoids",
    roboticsFunding: "https://www.ieee-ras.org/global-robotics-industry-funding-report-2025/",
    figureSeriesC: "https://www.figure.ai/news/series-c",
    openaiCheckout: "https://openai.com/index/buy-it-in-chatgpt/",
    stripeACP: "https://stripe.com/newsroom/news/stripe-openai-instant-checkout",
    salesforceHoliday: "https://www.salesforce.com/news/stories/2025-holiday-shopping-data/",
    anthropicEspionage: "https://www.anthropic.com/news/disrupting-AI-espionage",
    unscAIDebate: "https://press.un.org/en/2025/sgsm22830.doc.htm",
    aiPreemptionEO: "https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/",
    statePreemptionAnalysis: "https://www.ropesgray.com/en/insights/alerts/2026/03/examining-the-landscape-and-limitations-of-the-federal-push-to-override-state-ai-regulation",
    appleGemini: "https://www.cnbc.com/2026/01/12/apple-google-ai-siri-gemini.html"
  };

  function linked(text, links) {
    return { text, links: links || [] };
  }

  const PREDICTION_PAGES = [
    {
      slug: "calls-we-got-right",
      ogImage: "predictions-calls-we-got-right.png",
      type: "track-record",
      title: "The Calls We Got Right",
      seoTitle: "AI Predictions We Got Right | State of AI Report",
      dek: "Since 2018, the State of AI Report has made public forecasts about the next phase of AI and graded them in the open. This is the receipt book.",
      description: "A public track record of State of AI Report predictions that anticipated major shifts in AI research, markets, policy, compute, and open models.",
      keywords: ["AI predictions", "AI forecasting track record", "State of AI Report", "AI trends", "technology predictions"],
      sourceReportUrl: "https://www.stateof.ai/predictions",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "The State of AI Report's strongest calls anticipated transformers moving into vision, the collapse of NVIDIA's Arm deal, hyperscaler investment in frontier labs, regulatory scrutiny of AI partnerships, and the rapid rise of open reasoning models.",
      lead: [
        "Every State of AI Report closes with predictions for the year ahead, written to be graded. Anyone can narrate what just happened in AI; committing to what happens next, with a date on it, is harder. That is the point.",
        linked("The full ledger is public: 59 predictions graded since 2018, of which 31 resolved as hits, 8 as partials, and 20 as misses. That is a 53% strict hit rate, or 59% with half credit for partials. How we grade, and where our judgment is weakest, is documented in the accuracy analysis.", [
          { text: "accuracy analysis", url: SOURCES.accuracy }
        ]),
        linked("The public scorecard keeps us honest. The calls below mattered because they anticipated a change in how AI would be built, funded, regulated, or understood.", [
          { text: "public scorecard", url: SOURCES.predictions }
        ])
      ],
      receipts: [
        {
          year: "2020 to 2021",
          status: "Hit",
          prediction: "Attention-based networks move from NLP to computer vision, achieving SOTA results.",
          happened: linked("Google's Vision Transformer paper showed that a pure transformer could match or outperform leading convolutional networks on image classification.", [
            { text: "Vision Transformer paper", url: SOURCES.visionTransformer }
          ]),
          mattered: "Transformers were no longer a language trick. They were becoming the general architecture of AI.",
        },
        {
          year: "2020 to 2021",
          status: "Hit",
          prediction: "NVIDIA does not end up completing its acquisition of Arm.",
          happened: linked("NVIDIA and SoftBank terminated the transaction in February 2022, citing significant regulatory challenges.", [
            { text: "terminated the transaction", url: SOURCES.nvidiaArm }
          ]),
          mattered: "AI compute was already too strategically important for neutral chip infrastructure to change hands quietly.",
        },
        {
          year: "2022 to 2023",
          status: "Hit",
          prediction: "GAFAM invests >$1B into an AGI or open-source AI company.",
          happened: linked("Microsoft described its January 2023 commitment to OpenAI as a multiyear, multibillion-dollar investment.", [
            { text: "multiyear, multibillion-dollar investment", url: SOURCES.microsoftOpenAI }
          ]),
          mattered: "Frontier AI labs and hyperscale clouds became financially and technically interdependent.",
        },
        {
          year: "2023 to 2024",
          status: "Hit",
          prediction: "The US FTC or UK CMA investigate the Microsoft/OpenAI deal on competition grounds.",
          happened: linked("The CMA began examining whether the partnership created a relevant merger situation in December 2023, while the FTC issued orders examining the Microsoft/OpenAI investment alongside other cloud-lab partnerships.", [
            { text: "CMA began examining", url: SOURCES.cmaOpenAI },
            { text: "FTC issued orders", url: SOURCES.ftcAIInquiry }
          ]),
          mattered: "AI market power started being examined through cloud, compute, distribution, and control without ownership.",
        },
        {
          year: "2024 to 2025",
          status: "Hit",
          prediction: "An open-source alternative to OpenAI o1 surpasses it across a range of reasoning benchmarks.",
          happened: linked("DeepSeek-R1 reported results above OpenAI o1 on AIME 2024, MATH-500, and SWE-bench Verified.", [
            { text: "DeepSeek-R1", url: SOURCES.deepseekR1 }
          ]),
          mattered: "Reasoning advantages diffused faster than the closed-model story implied.",
        },
        {
          year: "2020 to 2021",
          status: "Hit",
          prediction: "A leading AI-first drug discovery startup IPOs or is acquired for over $1B.",
          happened: linked("Recursion began trading on Nasdaq in April 2021 at a roughly $2.9 billion valuation; Exscientia reached a similar market value on its October debut.", [
            { text: "began trading on Nasdaq", url: SOURCES.recursionIPO },
            { text: "roughly $2.9 billion valuation", url: SOURCES.recursionValuation },
            { text: "similar market value", url: SOURCES.exscientiaValuation }
          ]),
          mattered: "AI-first biotech moved from promise to public-market scrutiny.",
        },
        {
          year: "2022 to 2023",
          status: "Hit",
          prediction: "More than $100M is invested in dedicated AI alignment organisations in the next year.",
          happened: linked("Anthropic raised $450 million in May 2023 and said the financing would support further AI safety research.", [
            { text: "raised $450 million", url: SOURCES.anthropicSeriesC }
          ]),
          mattered: "AI safety stopped being a small research subculture and became part of the frontier-lab capital stack.",
        },
        {
          year: "2022 to 2023",
          status: "Hit",
          prediction: "A major UGC site negotiates a commercial settlement with an AI model maker for training data.",
          happened: linked("Shutterstock signed a six-year agreement licensing image, video, music, and metadata to OpenAI for model training.", [
            { text: "six-year agreement", url: SOURCES.shutterstockOpenAI }
          ]),
          mattered: "Training data became a commercial and legal asset class.",
        },
        {
          year: "2023 to 2024",
          status: "Hit",
          prediction: "Limited progress on global AI governance beyond high-level voluntary commitments.",
          happened: linked("The Bletchley and Seoul summits produced declarations and voluntary frontier-safety commitments, but no binding global enforcement regime.", [
            { text: "Bletchley", url: SOURCES.bletchleyDeclaration },
            { text: "Seoul", url: SOURCES.seoulDeclaration }
          ]),
          mattered: "The diplomacy moved faster than the institutions capable of enforcement.",
        },
        {
          year: "2024 to 2025",
          status: "Hit",
          prediction: "A research paper generated by an AI Scientist is accepted at a major ML conference or workshop.",
          happened: linked("Sakana AI's AI Scientist-v2 produced a paper that cleared an ICLR workshop's review threshold before being withdrawn under a pre-agreed research protocol.", [
            { text: "AI Scientist-v2", url: SOURCES.aiScientist }
          ]),
          mattered: "Scientific AI crossed from lab automation into the institutions that certify research.",
        }
      ],
      sections: [],
      faq: [
        {
          q: "How accurate is the State of AI Report overall?",
          a: linked("Across 59 graded predictions made between 2018 and 2024, the report scored 31 hits, 8 partials, and 20 misses: a 53% strict hit rate, or 59% with half credit for partials. The full breakdown by year and topic is in the accuracy analysis.", [
            { text: "accuracy analysis", url: SOURCES.accuracy }
          ])
        },
        {
          q: "Where can I see every prediction, including the misses?",
          a: linked("The predictions scorecard lists all 69 public predictions made since 2018, each graded hit, partial, miss, or pending, with a one-line justification for every verdict.", [
            { text: "predictions scorecard", url: SOURCES.predictions }
          ])
        },
        {
          q: "What was the report's single best call?",
          a: "By consequence, probably the 2020 call that attention-based networks would take over computer vision, made before Vision Transformers published. By degree of difficulty, the 2024 call that an open-source alternative would beat OpenAI o1 on reasoning benchmarks, which DeepSeek-R1 resolved within three months."
        }
      ],
      related: [
        "how-accurate-is-the-state-of-ai-report",
        "ai-agents-scientific-discovery",
        "why-we-were-wrong-about-humanoids"
      ]
    },
    {
      slug: "how-accurate-is-the-state-of-ai-report",
      ogImage: "predictions-how-accurate-is-the-state-of-ai-report.png",
      type: "track-record",
      title: "How Accurate Is the State of AI Report?",
      seoTitle: "How Accurate Are State of AI Report Predictions? | State of AI",
      dek: "Every prediction we have made since 2018, graded in public: 59 graded calls, 31 hits, 8 partials, 20 misses. This page explains the numbers, the grading rules, and what the misses say about our judgment.",
      description: "The State of AI Report's prediction accuracy since 2018: hit rates by year and topic, how predictions are graded, and what the misses have in common.",
      keywords: ["State of AI Report accuracy", "AI predictions track record", "AI forecasting hit rate", "State of AI predictions scorecard", "how accurate is the State of AI Report"],
      sourceReportUrl: "https://www.stateof.ai/predictions",
      datePublished: "2026-07-09",
      lastUpdated: "2026-07-09",
      answer: "Across 59 graded predictions made between 2018 and 2024, the State of AI Report scored 31 hits, 8 partials, and 20 misses: a 53% strict hit rate, or 59% counting partials as half credit. The report is strongest on industry and research calls and weakest on geopolitics and deal-driven predictions. Ten predictions from the 2025 report remain open and will be graded in October 2026.",
      lead: [
        "Most year-ahead commentary in AI is never checked. Ours is. Each annual State of AI Report closes with roughly ten falsifiable predictions for the next twelve months, and each following report grades them in public.",
        linked("This page is the audit. The underlying data, every prediction with its verdict and justification, lives on the scorecard.", [
          { text: "scorecard", url: SOURCES.predictions }
        ])
      ],
      sections: [
        {
          heading: "How do we grade predictions?",
          body: [
            "Every prediction is written to be checkable within about a year: a named event, a threshold, a deadline. The following year's report grades each one as a hit, a partial, or a miss, with a one-line justification. The original wording is never edited after publication, and verdicts are never quietly revised.",
            "Grading involves judgment, and we do it ourselves, so readers should treat partials with appropriate suspicion. That is why every verdict ships with its justification: if you think we were generous, the evidence to disagree is on the page."
          ]
        },
        {
          heading: "What is the overall hit rate?",
          body: [
            "As of July 2026, 59 predictions from the 2018 through 2024 reports have been graded: 31 hits, 8 partials, and 20 misses. Strictly, that is a 53% hit rate. Counting partials as half credit, 59%.",
            "The honest benchmark is not a coin flip. Most of these calls are low base-rate events: a specific acquisition collapsing, a specific benchmark falling, a specific dollar threshold being crossed within twelve months. Predicting that nothing unusual happens would score well and say nothing. We prefer calls that are wrong in an informative way."
          ],
          table: {
            caption: "Prediction accuracy by report year (accuracy counts partials as half credit)",
            head: ["Report year", "Graded", "Hits", "Partials", "Misses", "Accuracy"],
            rows: [
              ["2018", "8", "3", "1", "4", "44%"],
              ["2019", "6", "4", "1", "1", "75%"],
              ["2020", "8", "5", "1", "2", "69%"],
              ["2021", "8", "4", "0", "4", "50%"],
              ["2022", "9", "5", "1", "3", "61%"],
              ["2023", "10", "5", "2", "3", "60%"],
              ["2024", "10", "5", "2", "3", "60%"],
              ["Total", "59", "31", "8", "20", "59%"]
            ]
          }
        },
        {
          heading: "Where are we strongest and weakest?",
          body: [
            "The pattern across topics is consistent: we are better at predicting what the technology and its builders will do than what dealmakers and governments will do on a twelve-month clock.",
            "Industry calls, on adoption, products, and company behavior, run at 75% accuracy. Research calls run at 63%. The weak spots are geopolitics and investment, both at 38%, and hardware at 44%. The failure mode is usually specificity about transactions: we predicted semiconductor consolidation that never closed, an ASML market cap that took years longer to approach, and acquisition waves that stayed rumors."
          ],
          table: {
            caption: "Prediction accuracy by topic, 2018 to 2024 (topics with 3 or more graded predictions)",
            head: ["Topic", "Graded", "Hits", "Partials", "Misses", "Accuracy"],
            rows: [
              ["Industry", "10", "7", "1", "2", "75%"],
              ["Policy", "6", "3", "2", "1", "67%"],
              ["Bio", "3", "2", "0", "1", "67%"],
              ["Safety", "3", "2", "0", "1", "67%"],
              ["Media", "3", "2", "0", "1", "67%"],
              ["Research", "16", "9", "2", "5", "63%"],
              ["Hardware", "8", "3", "1", "4", "44%"],
              ["Geopolitics", "4", "1", "1", "2", "38%"],
              ["Investment", "4", "1", "1", "2", "38%"]
            ]
          }
        },
        {
          heading: "What do the misses have in common?",
          body: [
            "Timing, more than direction. In 2018 we predicted that access to Taiwanese and South Korean semiconductor firms would become an explicit part of the US-China trade war. Graded a miss in 2019; by 2022, chips were the center of the export-control regime. In 2023 we predicted a group would spend more than $1 billion training a single model. Graded a miss a year later, then overtaken by events. A one-year clock punishes calls that are early, and it should: a forecast that cannot be wrong on time is not a forecast.",
            linked("The second failure mode is underweighting narrative gravity in capital markets. Our worst recent miss, that humanoid investment would trail off without product-market fit, is dissected in its own post-mortem.", [
              { text: "post-mortem", url: "https://www.stateof.ai/predictions/why-we-were-wrong-about-humanoids" }
            ]),
            linked("The third is picking the right trend and the wrong protagonist. Our Apple on-device AI call is the cleanest example, and it has its own post-mortem too.", [
              { text: "Apple on-device AI call", url: "https://www.stateof.ai/predictions/why-we-were-wrong-about-apple" }
            ])
          ]
        },
        {
          heading: "What is open for 2026?",
          body: [
            linked("Ten predictions from the 2025 report resolve in the State of AI Report 2026, published in October 2026. They cover agentic commerce, open-sourcing at the frontier, AI scientific discovery, data center politics, generative media, and a Chinese frontier leaderboard moment. Each one is open for a live crowd forecast on the scorecard.", [
              { text: "scorecard", url: SOURCES.predictions }
            ]),
            "When they are graded, this page's tables will be updated, whichever way the numbers move."
          ]
        }
      ],
      faq: [
        {
          q: "How many predictions has the State of AI Report made?",
          a: "69 public predictions across the 2018 to 2025 reports: 59 graded and 10 still open. Each report typically makes around ten predictions for the year ahead."
        },
        {
          q: "Who grades the predictions?",
          a: "The report's authors, in public. Every verdict is published with a justification in the following year's report and on the scorecard, so anyone can audit or dispute a grade."
        },
        {
          q: "What does a partial mean?",
          a: "The prediction was directionally right but failed a specific condition: the right event at the wrong size, the right trend through the wrong actor, or a threshold that was approached but not crossed. Partials count as half credit in our accuracy figures and are 8 of 59 graded calls."
        }
      ],
      related: [
        "calls-we-got-right",
        "why-we-were-wrong-about-humanoids",
        "why-we-were-wrong-about-apple"
      ]
    },
    {
      slug: "ai-agents-scientific-discovery",
      ogImage: "predictions-ai-agents-scientific-discovery.png",
      type: "essay",
      title: "Can AI Agents Make Scientific Discoveries?",
      seoTitle: "Can AI Agents Make Scientific Discoveries? | State of AI",
      dek: "The next question for scientific AI is not whether models can assist researchers. It is whether they can own enough of the loop to produce a result the scientific community takes seriously.",
      description: "Can AI agents make scientific discoveries? The State of AI Report sets the evidence and validation needed for a credible end-to-end result.",
      keywords: ["AI agents scientific discovery", "AI for science", "autonomous scientist", "AI co-scientist", "State of AI predictions"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "AI agents can already propose hypotheses, design computational experiments, and write papers. A genuine end-to-end discovery still requires the agent to drive the hypothesis-experiment-evidence loop and produce a result that independent scientists validate.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-3",
          text: "Open-ended agents make a meaningful scientific discovery end-to-end (hypothesis, experiment, paper).",
          status: "Pending"
        },
        {
          label: "2024 prediction",
          id: "P2024-9",
          text: "A research paper generated by an AI Scientist is accepted at a major ML conference or workshop.",
          status: "Hit"
        },
        {
          label: "2023 prediction",
          id: "P2023-3",
          text: "Self-improving AI agents crush SOTA in a complex environment (AAA game, tool use, science).",
          status: "Miss"
        }
      ],
      sections: [
        {
          heading: "What can AI research agents already do?",
          body: [
            linked("Google's AI co-scientist generated hypotheses and experimental protocols; Stanford's Virtual Lab coordinated an AI principal investigator and specialist agents; Sakana AI's AI Scientist-v2 ran machine-learning experiments and wrote the resulting paper.", [
              { text: "AI co-scientist", url: SOURCES.aiCoScientist },
              { text: "Virtual Lab", url: SOURCES.virtualLab },
              { text: "AI Scientist-v2", url: SOURCES.aiScientist }
            ]),
            linked("The clearest single artifact so far is mathematical. Google DeepMind's AlphaEvolve found a way to multiply 4x4 complex-valued matrices using 48 scalar multiplications, the first improvement on Strassen's 1969 algorithm in that setting in 56 years. The result is real, machine-verifiable, and was found by an evolutionary agent. But humans chose the problem, wrote the evaluator, and decided the result mattered.", [
              { text: "AlphaEvolve", url: SOURCES.alphaEvolve }
            ]),
            "That is exactly the boundary our prediction tests. None of these systems settles the end-to-end question: whether an agent can choose a worthwhile hypothesis, decide what evidence matters, run or direct the experiment, survive a negative result, and produce a contribution that peers take seriously."
          ]
        },
        {
          heading: "Why did we predict an end-to-end discovery?",
          body: [
            linked("The 2025 State of AI Report argued that AI was becoming a scientific collaborator, then made the stronger prediction: an open-ended agent would make a meaningful discovery across hypothesis, experiment, and paper.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 }
            ]),
            "We have made versions of this call before. In 2023 we predicted self-improving agents would crush state of the art in a complex environment, and graded ourselves a miss. In 2024 we predicted an AI-generated paper would clear a major conference or workshop, and it did. The 2025 call raises the bar again, and the wording is deliberately strict: a writing assistant is not a scientist, and an agent that optimizes a predefined benchmark has not chosen a scientific question. The call is about ownership of the loop, not fluent output at the end of it."
          ]
        },
        {
          heading: "What would count as an AI-made discovery?",
          body: [
            "A credible hit requires the AI system to drive the work across hypothesis formation, experimental design or execution, analysis, and the paper or preprint. A human may set the broad domain and provide physical access, but cannot quietly supply the central idea.",
            "The strongest evidence would be independent reproduction, validation by domain experts, or acceptance by a serious scientific venue with the agent's role disclosed. Workshop acceptance alone is evidence of progress, not proof of meaningful discovery. AlphaEvolve-style results sit just below the bar for the same reason: verifiable output, human-chosen question."
          ]
        },
        {
          heading: "Why does the end-to-end test matter?",
          body: [
            "If an agent can close the loop, scientific AI stops being mainly a productivity tool. Parts of the scientific method become delegable.",
            "What matters then is no longer literature coverage or coding speed. It is question selection, experimental access, validation, and whether a system can tell when its own result is weak. That is a much larger change than automating a lab task."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching agentic lab systems that connect literature review, experimental planning, analysis, and revision rather than optimizing one isolated step, particularly in biology, chemistry, and materials, where experimental access is the bottleneck.",
            "Look for papers that credit models for validated hypotheses or experimental choices, and for evaluations that test long-horizon research instead of static scientific question answering. This prediction is graded in the State of AI Report 2026, publishing in October."
          ]
        }
      ],
      faq: [
        {
          q: "Has an AI system made a scientific discovery yet?",
          a: linked("Narrow, verifiable results exist: AlphaEvolve improved on a 56-year-old matrix multiplication record, and Sakana's AI Scientist-v2 wrote a paper that passed workshop review. No system has yet owned the full loop, from choosing the hypothesis to producing an independently validated result.", [
            { text: "AlphaEvolve", url: SOURCES.alphaEvolve },
            { text: "AI Scientist-v2", url: SOURCES.aiScientist }
          ])
        },
        {
          q: "What is the difference between an AI co-scientist and an AI scientist?",
          a: "A co-scientist proposes hypotheses and protocols inside a human-led loop; the human still selects the question and judges the evidence. An AI scientist would own those decisions. Every credible system today, including Google's AI co-scientist and Stanford's Virtual Lab, is the former."
        },
        {
          q: "When will this prediction be graded?",
          a: "In the State of AI Report 2026, published in October 2026. The verdict and its justification will appear on the public predictions scorecard."
        }
      ],
      related: [
        "calls-we-got-right",
        "china-frontier-ai-lead",
        "open-models-geopolitics"
      ]
    },
    {
      slug: "open-models-geopolitics",
      ogImage: "predictions-open-models-geopolitics.png",
      type: "essay",
      title: "Open Models Are Now Geopolitics",
      seoTitle: "Why Open AI Models Are Now Geopolitics | State of AI",
      dek: "Open model releases are no longer only about developer goodwill. They are becoming instruments of industrial policy, national competitiveness, and platform power.",
      description: "Why open-weight AI models are becoming tools of industrial policy, national competitiveness, developer distribution, and geopolitical power.",
      keywords: ["open AI models geopolitics", "open-weight models", "AI industrial policy", "DeepSeek R1", "US China AI competition"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "Open-weight models are geopolitical because they export capability, recruit developers, shape technical standards, and make one country's AI stack easier for the rest of the world to adopt. Model release policy is now a form of industrial policy.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-2",
          text: "A major AI lab leans back into open-sourcing frontier models to win over the current US administration.",
          status: "Pending"
        },
        {
          label: "2024 prediction",
          id: "P2024-5",
          text: "An open-source alternative to OpenAI o1 surpasses it across a range of reasoning benchmarks.",
          status: "Hit"
        }
      ],
      sections: [
        {
          heading: "Why are open-weight models geopolitical?",
          body: [
            linked("America's AI Action Plan explicitly describes open-source and open-weight models as strategically valuable for innovation, academic research, and global adoption. That is a political argument for model distribution, not merely a research norm.", [
              { text: "America's AI Action Plan", url: SOURCES.aiActionPlan }
            ]),
            linked("DeepSeek-R1 made the mechanism concrete: a Chinese open-weight reasoning model could spread capability through the global developer ecosystem without waiting for a proprietary distribution channel.", [
              { text: "DeepSeek-R1", url: SOURCES.deepseekR1 }
            ])
          ]
        },
        {
          heading: "Why did we predict a lean back into open source?",
          body: [
            linked("The 2025 State of AI Report described a harder AI politics: an America-first policy turn, a growing Chinese open-weight ecosystem, and a narrowing frontier. Stanford's 2025 AI Index reached the same directional conclusion: the US still produced more leading models, but China's performance gap was closing quickly.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 },
              { text: "2025 AI Index", url: SOURCES.stanfordAI2025 }
            ]),
            linked("The direction of travel was visible before we published the call. In August 2025, OpenAI released gpt-oss-120b and gpt-oss-20b, its first open-weight models since GPT-2, under Apache 2.0 and with reasoning performance near its own o4-mini. Two months later, Reflection AI raised $2 billion at an $8 billion valuation, backed by NVIDIA and Eric Schmidt, explicitly branding itself as America's open frontier lab and a Western answer to DeepSeek.", [
              { text: "released gpt-oss-120b and gpt-oss-20b", url: SOURCES.gptOss },
              { text: "raised $2 billion", url: SOURCES.reflectionAI }
            ]),
            "Capital and policy are converging on the same thesis. Keeping frontier weights closed may protect a capability lead; it may also concede developer mindshare, local deployment, and global distribution to models built elsewhere. Our prediction is that a major lab acts on that dilemma explicitly."
          ]
        },
        {
          heading: "What would count as a hit?",
          body: [
            "The strong version is a major frontier lab releasing, or committing to release, a frontier or near-frontier open-weight model while explicitly framing the decision around US competitiveness, policy access, or national AI strategy.",
            "gpt-oss predates the prediction and sits a tier below the frontier, so it does not clear the bar on its own. A routine research release does not either. The signal is political language around openness, backed by a model capable enough to change developer behavior."
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "Open-weight models export capability and make an ecosystem easier to adopt, modify, and deploy locally. Each installation can pull developers, tooling, fine-tuning recipes, and infrastructure toward the country or company that set the default.",
            "That makes model-release policy part of foreign policy. The useful question is no longer open versus closed in the abstract. It is whose open ecosystem becomes the world's second stack."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching for US policy speeches that treat open-weight AI as a national advantage, for labs shifting their release language from research access toward competitiveness and export power, and for Reflection AI's first releases, which will test whether a venture-funded open frontier lab is viable.",
            linked("The market signal is whether Chinese open-weight models keep narrowing the gap on broad evaluations while gaining real developer and enterprise adoption. Artificial Analysis's China tracking provides one public measure of that convergence.", [
              { text: "Artificial Analysis's China tracking", url: SOURCES.artificialAnalysisChina }
            ])
          ]
        }
      ],
      faq: [
        {
          q: "What is an open-weight model?",
          a: "A model whose trained parameters are published for anyone to download, run, fine-tune, and deploy locally. The weights are open even when the training data and code are not, which is why open-weight is the precise term for models like DeepSeek-R1 or gpt-oss."
        },
        {
          q: "Why would a US lab open-source frontier models?",
          a: "Distribution and politics. Open weights recruit developers, seed a country's technical standards abroad, and align with an administration that has framed open models as strategically valuable. The cost is giving up some capability lead; the bet is that ecosystem gravity is worth more."
        },
        {
          q: "Which open-weight models are closest to the frontier?",
          a: linked("On the Chinese side, the DeepSeek, Qwen, Kimi, and GLM families have kept open releases within reach of the closed frontier on broad evaluations. On the US side, gpt-oss is the most capable open-weight release from a major lab to date. Live comparisons are on Artificial Analysis.", [
            { text: "Artificial Analysis", url: SOURCES.artificialAnalysisModels }
          ])
        }
      ],
      related: [
        "china-frontier-ai-lead",
        "calls-we-got-right",
        "ai-infrastructure-politics"
      ]
    },
    {
      slug: "ai-infrastructure-politics",
      ogImage: "predictions-ai-infrastructure-politics.png",
      type: "essay",
      title: "AI Infrastructure Is Becoming Local Politics",
      seoTitle: "AI Data Centers Are Becoming Local Politics | State of AI",
      dek: "The AI boom is starting to look less like software and more like heavy industry: land, power, water, permits, grids, and voters.",
      description: "Why AI data centers are becoming a local political issue through electricity demand, water use, grid constraints, land, and permitting.",
      keywords: ["AI data center politics", "data center electricity demand", "AI infrastructure", "data center NIMBYism", "sovereign AI"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "AI data centers become local politics when their demand for power, water, land, transmission, and permits affects household bills and development choices. That is already happening: data centers were a central issue in Virginia's 2025 governor's race and Georgia's utility regulator elections, and Tucson rejected a major data center project outright.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-9",
          text: "Datacenter NIMBYism takes the US by storm and sways certain 2026 midterm/gubernatorial elections.",
          status: "Pending"
        },
        {
          label: "2025 prediction",
          id: "P2025-6",
          text: "'AI neutrality' emerges as a foreign-policy doctrine as some nations cannot or fail to develop sovereign AI.",
          status: "Pending"
        },
        {
          label: "2024 prediction",
          id: "P2024-1",
          text: "A $10B+ investment from a sovereign state into a US large AI lab invokes national security review.",
          status: "Partial"
        }
      ],
      sections: [
        {
          heading: "Why is AI infrastructure a local political issue?",
          body: [
            linked("The industrial era of AI has substations, cooling systems, land deals, transmission lines, and neighbors. Lawrence Berkeley National Laboratory estimates that US data centers used 4.4% of electricity in 2023 and could reach 6.7% to 12% by 2028.", [
              { text: "Lawrence Berkeley National Laboratory estimates", url: SOURCES.lbnlDataCenters }
            ]),
            "Once that load becomes visible in electricity bills, water debates, and planning fights, AI stops being a distant software story. It becomes ordinary local politics."
          ]
        },
        {
          heading: "Why did we predict elections would turn on data centers?",
          body: [
            linked("The 2025 State of AI Report put multi-gigawatt data centers and power constraints at the center of frontier competition. The US Department of Energy separately warned that data centers could consume up to 9% of US electricity by 2030, from 4% in 2023.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 },
              { text: "Department of Energy", url: SOURCES.doeDataCenters }
            ]),
            linked("The 2025 off-cycle elections gave the thesis its first test. In Virginia, home to roughly 13% of global data center capacity, data centers and energy affordability were central to the governor's race; Abigail Spanberger won on a platform that requires data centers to pay their fair share for power. In Georgia, two Democratic challengers unseated incumbent utility regulators with more than 62% of the vote in races dominated by power bills and data center demand. In August 2025, Tucson's city council rejected the Amazon-linked Project Blue data center 7 to 0 after weeks of public pressure over water.", [
              { text: "central to the governor's race", url: SOURCES.vpmVirginia },
              { text: "unseated incumbent utility regulators", url: SOURCES.georgiaPSC },
              { text: "rejected the Amazon-linked Project Blue data center", url: SOURCES.tucsonProjectBlue }
            ]),
            "The Tucson coda is instructive: after the council vote, the project advanced anyway through county channels and a state utility approval. The politics can be loud and the build can still happen. That gap, between what voters reject and what gets built, is where the 2026 midterm fights will live."
          ]
        },
        {
          heading: "What would count as a hit?",
          body: [
            "For data center politics, the hard evidence is a campaign ad, debate, poll, candidate platform, or post-election analysis showing that an AI infrastructure project materially shaped a 2026 midterm, state, or gubernatorial race. The 2025 Virginia and Georgia results are strong leading indicators, but the prediction names the 2026 cycle.",
            "For AI neutrality, the clean evidence is a government or bloc formally adopting non-alignment in compute procurement, model access, cloud infrastructure, or technical standards."
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "AI infrastructure puts the industry in contact with voters who may never follow a benchmark but do care about power prices, water use, construction, jobs, and who captures the upside.",
            "Those voters can slow projects, change utility rules, redirect investment, and reshape the geography of frontier AI. A model race that looks global from San Francisco can still be decided by a county permit."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching state and local permitting fights, new utility tariffs for very large loads, grid operators naming AI demand as a material planning risk, and whether data centers appear in 2026 midterm campaign advertising.",
            "Internationally, the signal is whether governments frame cloud and model procurement as non-alignment rather than simply choosing the cheapest US, Chinese, European, or regional provider."
          ]
        }
      ],
      faq: [
        {
          q: "How much electricity do US data centers use?",
          a: linked("Lawrence Berkeley National Laboratory estimates data centers used 4.4% of US electricity in 2023 and could reach 6.7% to 12% by 2028. The Department of Energy has cited a path to 9% by 2030.", [
            { text: "Lawrence Berkeley National Laboratory estimates", url: SOURCES.lbnlDataCenters }
          ])
        },
        {
          q: "Have data centers already influenced US elections?",
          a: linked("Yes. Data centers and the power bills they drive were central issues in Virginia's 2025 governor's race and in Georgia's 2025 Public Service Commission races, where two incumbents lost. Our prediction targets the larger 2026 midterm cycle.", [
            { text: "Virginia's 2025 governor's race", url: SOURCES.vpmVirginia }
          ])
        },
        {
          q: "What is AI neutrality?",
          a: "A prospective foreign-policy stance in which a country declines to align its AI stack, compute procurement, cloud infrastructure, model access, or standards, with either the US or Chinese bloc. We predicted in 2025 that it would emerge as an explicit doctrine; it remains pending."
        }
      ],
      related: [
        "calls-we-got-right",
        "open-models-geopolitics",
        "china-frontier-ai-lead"
      ]
    },
    {
      slug: "ai-media-backlash",
      ogImage: "predictions-ai-media-backlash.png",
      type: "essay",
      title: "The Next AI Backlash Will Be Cultural",
      seoTitle: "Why the Next AI Backlash Will Be Cultural | State of AI",
      dek: "Technical quality is no longer the only question for AI media. The more interesting question is what happens when audiences like the work and dislike how it was made.",
      description: "Why AI-generated film, games, music, and media may win audiences while provoking backlash over labor, authorship, disclosure, and taste.",
      keywords: ["AI media backlash", "AI-generated film", "generative AI entertainment", "AI art controversy", "AI labor rights"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "The next AI media backlash is likely to arrive when audiences enjoy an AI-assisted work but reject the labor bargain, authorship claim, or disclosure around how it was made. Quality creates the audience; legitimacy creates the fight.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-7",
          text: "A movie or short film produced with significant use of AI wins major audience praise and sparks backlash.",
          status: "Pending"
        },
        {
          label: "2025 prediction",
          id: "P2025-5",
          text: "A real-time generative video game becomes the year's most-watched title on Twitch.",
          status: "Pending"
        },
        {
          label: "2023 prediction",
          id: "P2023-1",
          text: "A Hollywood-grade production makes use of generative AI for visual effects.",
          status: "Hit"
        },
        {
          label: "2023 prediction",
          id: "P2023-9",
          text: "An AI-generated song breaks into the Billboard Hot 100 Top 10 or Spotify Top Hits 2024.",
          status: "Hit"
        }
      ],
      sections: [
        {
          heading: "Why will the next AI backlash be cultural?",
          body: [
            linked("The first AI media debate asked whether the outputs were good enough. The next asks whether the process is legitimate. The 2023 WGA agreement states that generative AI is not a writer, while SAG-AFTRA's negotiated protections require consent and compensation around digital replicas.", [
              { text: "2023 WGA agreement", url: SOURCES.wgaAI },
              { text: "SAG-AFTRA's negotiated protections", url: SOURCES.sagAftraAI }
            ]),
            "A work can be technically impressive, emotionally effective, and still trigger a fight over labor, authorship, disclosure, and taste. That tension only becomes culturally important once the audience wants to watch."
          ]
        },
        {
          heading: "Why did we make this call?",
          body: [
            linked("The 2023 State of AI Report predicted that a Hollywood-grade production would use generative AI for visual effects. By the 2025 prediction cycle, the capability question had become less interesting than the audience response.", [
              { text: "2023 State of AI Report", url: SOURCES.state2023 }
            ]),
            linked("The Tilly Norwood episode showed how primed the reaction is. In September 2025, a UK studio unveiled an entirely AI-generated 'actress' and claimed studio interest; within days SAG-AFTRA declared that Tilly Norwood is not an actor but a character generated by a program trained on the work of countless professional performers, without permission or compensation. Emily Blunt and Whoopi Goldberg joined the pile-on.", [
              { text: "SAG-AFTRA declared", url: SOURCES.sagTilly }
            ]),
            "The revealing part: the backlash arrived before any acclaimed work existed. Tilly Norwood had no film, no audience, no praise. If a persona alone triggers this, an AI-assisted work that people genuinely love will trigger far more. That is why the prediction pairs praise with backlash. If everyone hates the work, it is a failed product. If everyone accepts it, there is no cultural rupture. The live wire is both at once."
          ]
        },
        {
          heading: "What would count as a hit?",
          body: [
            linked("The test case is already scheduled. Critterz, an OpenAI-backed animated feature made with AI across its production pipeline for a budget in the $30 million range, against the $100 million-plus typical of studio animation, is targeting a Cannes 2026 premiere and a global theatrical release. If it lands with audiences, the praise-plus-backlash condition gets its first real trial.", [
              { text: "Critterz", url: SOURCES.critterzCannes }
            ]),
            "For film, the work must use generative AI materially, earn real audience praise, and provoke a meaningful public or industry backlash. A marketing stunt, background asset, or pile-on around a bad trailer is not enough. For games, real-time generation must be a core mechanic rather than an asset-production shortcut, and it must drive sustained audience attention on Twitch rather than a brief novelty spike."
          ]
        },
        {
          heading: "Why it matters",
          body: [
            linked("Media is where AI becomes emotionally legible to the public. Provenance systems such as Content Credentials can disclose how a work was made, but disclosure does not decide whether audiences regard the process as fair or the result as art.", [
              { text: "Content Credentials", url: SOURCES.c2pa }
            ]),
            "Cultural acceptance is therefore a product constraint, not a communications problem. Entertainment companies will have to decide how much AI use to disclose, what labor bargain supports it, and whether the audience believes the humans involved still authored the work. Critterz's economics explain the pressure: if AI production reliably cuts an animated feature's budget by two thirds, the question is not whether studios use it, but on what terms."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching festival selections, streaming releases, and viral shorts with disclosed AI-heavy production, followed by how creators, unions, and audiences react once the production method becomes part of the story. Critterz's reception at and after Cannes is the single clearest signal on the calendar.",
            "In games, the signal is whether generative systems change the live viewing experience rather than simply lowering development costs behind the scenes."
          ]
        }
      ],
      faq: [
        {
          q: "Has an AI film sparked a backlash yet?",
          a: linked("The strongest episode so far involved no film at all: the AI 'actress' Tilly Norwood drew condemnation from SAG-AFTRA and prominent actors in September 2025 on the strength of a persona alone. Our prediction requires the harder case, a work that wins real audience praise and provokes backlash.", [
            { text: "condemnation from SAG-AFTRA", url: SOURCES.sagTilly }
          ])
        },
        {
          q: "What do the Hollywood AI agreements actually say?",
          a: linked("The 2023 WGA agreement establishes that generative AI cannot be credited as a writer and cannot be used to undermine writer credit or pay. SAG-AFTRA's terms require consent and compensation for digital replicas of performers.", [
            { text: "2023 WGA agreement", url: SOURCES.wgaAI }
          ])
        },
        {
          q: "What is Critterz?",
          a: linked("An OpenAI-backed, human-led but AI-assisted animated feature produced with Vertigo Films and Native Foreign for roughly $30 million, targeting a Cannes 2026 premiere. It is positioned as the first mainstream test of whether audiences embrace a feature film made substantially with AI.", [
            { text: "OpenAI-backed", url: SOURCES.critterzCannes }
          ])
        }
      ],
      related: [
        "calls-we-got-right",
        "ai-agents-scientific-discovery",
        "why-we-were-wrong-about-humanoids"
      ]
    },
    {
      slug: "china-frontier-ai-lead",
      ogImage: "predictions-china-frontier-ai-lead.png",
      type: "essay",
      title: "Could China Take The Frontier AI Lead?",
      seoTitle: "Could China Take the Frontier AI Lead? | State of AI",
      dek: "The question is no longer whether Chinese labs can build excellent models. It is whether one of them can create a public frontier moment that changes global perception.",
      description: "Could China take the frontier AI lead? The State of AI Report examines Chinese models, open weights, benchmarks, and the narrowing US-China gap.",
      keywords: ["China frontier AI lead", "US China AI race", "Chinese AI models", "DeepSeek", "Qwen", "AI model leaderboards"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "Yes, a Chinese lab could take a visible frontier lead. Stanford's 2026 AI Index says the US-China model performance gap has effectively closed, and Chinese models have reached the top five on broad leaderboards. The unresolved question is whether one reaches number one on a major leaderboard and holds it long enough to change market perception.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-8",
          text: "A Chinese lab overtakes the US-dominated frontier on a major leaderboard (e.g. LMArena / Artificial Analysis).",
          status: "Pending"
        },
        {
          label: "2018 prediction",
          id: "P2018-1",
          text: "A lab located in China makes a significant research breakthrough.",
          status: "Hit"
        },
        {
          label: "2024 prediction",
          id: "P2024-5",
          text: "An open-source alternative to OpenAI o1 surpasses it across a range of reasoning benchmarks.",
          status: "Hit"
        }
      ],
      sections: [
        {
          heading: "Is the US-China AI gap actually closed?",
          body: [
            linked("The frontier is technical, but it is also social. Stanford's 2026 AI Index concludes that the US-China model performance gap has effectively closed. Public leaderboards matter because practitioners, buyers, policymakers, and the press use them to coordinate their beliefs about who leads.", [
              { text: "Stanford's 2026 AI Index", url: SOURCES.stanfordAI2026Performance }
            ]),
            "A Chinese lab reaching number one on a major broad leaderboard would not settle the AI race. It would puncture the default assumption that the public frontier is structurally American."
          ]
        },
        {
          heading: "Why did we make the call?",
          body: [
            linked("The 2025 State of AI Report described OpenAI's lead as narrow and competition from DeepSeek, Qwen, and Kimi as increasingly credible. DeepSeek-R1 had already shown what closing the gap looks like in numbers: the paper reported 79.8% on AIME 2024 against o1's 79.2%, 97.3% on MATH-500 against 96.4%, and 49.2% on SWE-bench Verified against 48.9%.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 },
              { text: "DeepSeek-R1", url: SOURCES.deepseekR1 }
            ]),
            "Margins of a fraction of a point, published openly, at a fraction of the reported training cost. When the gap is that thin at the level of a single model family, a leaderboard overtake stops being a hypothetical and becomes a matter of release timing.",
            linked("Chinese labs have also used open releases as distribution, not just disclosure. Artificial Analysis tracked the US-China open-weight frontier converging through 2025, which means a leaderboard result can travel quickly into local deployments and developer tools.", [
              { text: "Artificial Analysis", url: SOURCES.artificialAnalysisChina }
            ])
          ]
        },
        {
          heading: "What would count as taking the lead?",
          body: [
            "The clean evidence is a Chinese lab reaching number one on a major, widely followed frontier-model leaderboard such as LMArena or the Artificial Analysis Intelligence Index.",
            "A narrow subtask win does not clear the bar. The result should cover broad model capability, remain visible after routine leaderboard updates, and be strong enough to affect practitioner perception.",
            linked("As of this page's last update, the strongest Chinese entries sit inside the top five on LMArena's overall leaderboard without having taken and held the top slot. The distance the prediction measures is now roughly one release cycle wide.", [
              { text: "LMArena's overall leaderboard", url: SOURCES.lmarena }
            ])
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "A public frontier lead would change procurement, policy, developer adoption, and the geopolitical narrative around AI capability. Countries choosing models and infrastructure would have evidence that frontier quality is not exclusive to the US stack.",
            "It would also force US labs to respond through price, openness, release cadence, or new evaluation claims. The immediate consequence may be commercial before it is geopolitical."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            linked("We are watching Chinese models on LMArena and Artificial Analysis, then checking whether apparent wins survive across coding, reasoning, and multimodal evaluations.", [
              { text: "LMArena", url: SOURCES.lmarena },
              { text: "Artificial Analysis", url: SOURCES.artificialAnalysisModels }
            ]),
            "The second signal is distribution: open-weight Chinese releases becoming default developer choices outside China, followed by US labs treating their quality as a strategic threat rather than a benchmark inconvenience. This prediction is graded in the State of AI Report 2026, publishing in October."
          ]
        }
      ],
      faq: [
        {
          q: "Has a Chinese AI model reached number one on LMArena?",
          a: linked("Not as of this page's last update. Chinese models have reached the top five on LMArena's overall leaderboard, but none has taken and held first place. The live standings are on LMArena.", [
            { text: "LMArena", url: SOURCES.lmarena }
          ])
        },
        {
          q: "Which Chinese labs are closest to the frontier?",
          a: "DeepSeek, Alibaba's Qwen team, Moonshot AI's Kimi, and Zhipu's GLM family have all shipped models competitive with the closed frontier on broad evaluations, most of them as open-weight releases."
        },
        {
          q: "Did DeepSeek-R1 really beat OpenAI o1?",
          a: linked("On several published benchmarks, yes: the R1 paper reported 79.8% versus 79.2% on AIME 2024, 97.3% versus 96.4% on MATH-500, and 49.2% versus 48.9% on SWE-bench Verified. o1 retained an edge elsewhere; the significance was an open model matching a closed frontier reasoning model at all.", [
            { text: "R1 paper", url: SOURCES.deepseekR1 }
          ])
        }
      ],
      related: [
        "open-models-geopolitics",
        "how-accurate-is-the-state-of-ai-report",
        "ai-infrastructure-politics"
      ]
    },
    {
      slug: "why-we-were-wrong-about-humanoids",
      ogImage: "predictions-why-we-were-wrong-about-humanoids.png",
      type: "essay",
      title: "Why We Were Wrong About Humanoids",
      seoTitle: "Why We Were Wrong About Humanoid Robots | State of AI",
      dek: "We thought humanoid investment would trail off as product-market fit stayed elusive. The product question was reasonable. The capital-markets call was wrong.",
      description: "Why the State of AI Report was wrong about humanoid robot investment, and what the miss reveals about product-market fit, capital, and platform bets.",
      keywords: ["humanoid robot investment", "humanoid robotics funding", "AI prediction miss", "robotics product-market fit", "State of AI Report"],
      sourceReportUrl: "https://www.stateof.ai/2024",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "We were wrong because we treated product-market fit as the near-term constraint on humanoid investment. Investors instead funded the option that foundation models could turn embodied AI into a platform: humanoid funding roughly doubled to $3 billion in 2025, and Figure alone raised over $1 billion at a $39 billion valuation.",
      predictions: [
        {
          label: "2024 prediction",
          id: "P2024-7",
          text: "Investment in humanoids trails off as companies struggle to achieve product-market fit.",
          status: "Miss"
        }
      ],
      sections: [
        {
          heading: "What was the original call?",
          body: [
            linked("The skepticism was about deployment. Humanoid robots had impressive demos, expensive hardware, difficult integration, and uncertain near-term product-market fit. A UK government technology assessment reached a similarly cautious conclusion on technical maturity, applications, and public acceptance.", [
              { text: "UK government technology assessment", url: SOURCES.humanoidsAssessment }
            ]),
            "That deployment skepticism may still prove directionally right. The mistake was assuming that product-market fit would be the near-term constraint on capital."
          ]
        },
        {
          heading: "What actually happened?",
          body: [
            linked("Instead of trailing off, humanoid investment accelerated. The State of AI scorecard marks the prediction as a miss: roughly $3 billion was invested in humanoids in 2025, up from $1.4 billion in 2024. The IEEE Robotics and Automation Society's 2025 funding report documents the wider surge in robotics capital.", [
              { text: "State of AI scorecard", url: SOURCES.predictions },
              { text: "2025 funding report", url: SOURCES.roboticsFunding }
            ]),
            linked("One company carries most of the story. In September 2025, Figure closed more than $1 billion of Series C capital at a $39 billion post-money valuation, backed by NVIDIA, Intel Capital, Qualcomm Ventures, Brookfield, and Salesforce. Nineteen months earlier, its Series B had valued the company at $2.6 billion. A 15x markup between rounds, in a category we said would cool.", [
              { text: "closed more than $1 billion", url: SOURCES.figureSeriesC }
            ]),
            "Investors were not only underwriting current deployments. They were buying option value on embodied AI becoming a platform category."
          ]
        },
        {
          heading: "Why did we get it wrong?",
          body: [
            "We overweighted product-market fit and underweighted narrative gravity. Foundation models made general-purpose robotics feel newly plausible, and capital became willing to finance the bridge from demos to deployment.",
            "In an AI platform cycle, financing can precede evidence by years. Sometimes that is exuberance. Sometimes it is the only way a hardware category with factories, data collection, and long integration cycles gets built. Our prediction collapsed those possibilities into a single near-term funding call."
          ]
        },
        {
          heading: "Why does the miss matter?",
          body: [
            "The miss separates two questions that we treated as one: will humanoids work commercially, and will capital keep funding the attempt?",
            linked("Those questions can have different answers for several years. A useful robotics forecast must specify whether it concerns technical capability, repeat deployment, unit economics, or financing appetite. This failure mode, being right about the product and wrong about the capital, shows up elsewhere in our track record too; see the accuracy analysis for the pattern.", [
              { text: "accuracy analysis", url: SOURCES.accuracy }
            ])
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "The evidence that matters now is repeat deployment beyond pilots: renewal, utilization, intervention rates, maintenance burden, safety, and integration cost.",
            "We are also watching whether foundation-model progress translates into robust manipulation and autonomy in messy environments. Capital answered one question. Customers still have to answer the other. If Figure's valuation is right, the deployment data will eventually have to show it."
          ]
        }
      ],
      faq: [
        {
          q: "How much was invested in humanoid robots in 2025?",
          a: linked("Roughly $3 billion, up from $1.4 billion in 2024, per the IEEE Robotics and Automation Society's global funding report. Figure's Series C alone exceeded $1 billion at a $39 billion post-money valuation.", [
            { text: "global funding report", url: SOURCES.roboticsFunding }
          ])
        },
        {
          q: "Why did the State of AI Report predict humanoid investment would trail off?",
          a: "Because deployment evidence was thin: expensive hardware, hard integration, and no repeatable product-market fit. The deployment read may still prove right; the error was assuming capital would wait for the evidence."
        },
        {
          q: "Was the humanoid skepticism wrong?",
          a: "The funding call was wrong, and we graded it a miss. The commercial question is still open: valuations now assume embodied AI becomes a platform, and the deployment data, renewals, utilization, and unit economics, has not yet confirmed it."
        }
      ],
      related: [
        "how-accurate-is-the-state-of-ai-report",
        "why-we-were-wrong-about-apple",
        "ai-agents-scientific-discovery"
      ]
    },
    {
      slug: "agentic-commerce",
      ogImage: "predictions-agentic-commerce.png",
      type: "essay",
      title: "Will AI Agents Do Your Shopping?",
      seoTitle: "Will AI Agents Do Your Shopping? Agentic Commerce | State of AI",
      dek: "The infrastructure for agent-led shopping arrived in a single quarter: protocols, payment rails, and checkout inside ChatGPT. The open question is whether consumers actually delegate the purchase.",
      description: "How big is agentic commerce? The State of AI Report tracks AI shopping agents, Instant Checkout, the Agentic Commerce Protocol, and the 5% test.",
      keywords: ["agentic commerce", "AI shopping agents", "agentic checkout", "ChatGPT Instant Checkout", "Agentic Commerce Protocol", "AI agent share of online sales"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-09",
      lastUpdated: "2026-07-09",
      answer: "Not yet at scale. AI agents influenced roughly 20% of global online holiday spending in 2025, but purchases completed end-to-end by an agent remain a small fraction of sales. Our prediction requires a major retailer to attribute more than 5% of online sales to agentic checkout, and that bar has not been cleared.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-1",
          text: "A major retailer reports >5% of online sales from agentic checkout as AI agent ad spend hits $5B.",
          status: "Pending"
        }
      ],
      sections: [
        {
          heading: "How real is agentic commerce?",
          body: [
            linked("The rails were built fast. In September 2025, OpenAI launched Instant Checkout in ChatGPT, letting US users buy from Etsy sellers in the chat itself, with more than a million Shopify merchants to follow, and open-sourced the Agentic Commerce Protocol it built with Stripe so any merchant or developer can plug in.", [
              { text: "launched Instant Checkout", url: SOURCES.openaiCheckout },
              { text: "Agentic Commerce Protocol", url: SOURCES.stripeACP }
            ]),
            linked("The demand signal followed within a quarter. Salesforce's holiday tracking attributed $262 billion of the $1.29 trillion in global online holiday sales, about 20%, to AI and agent influence, and found that shoppers arriving from AI channels converted roughly nine times more often than social media referrals.", [
              { text: "Salesforce's holiday tracking", url: SOURCES.salesforceHoliday }
            ]),
            "Those two facts describe different things, and the difference is the whole question. Influence means a model helped someone decide. Agentic checkout means the agent completed the purchase. The first is already mainstream; the second is still a sliver of transactions."
          ]
        },
        {
          heading: "Why did we predict a 5% breakthrough?",
          body: [
            linked("The 2025 State of AI Report argued that commerce was the most natural first market for consumer agents: high purchase intent, structured catalogs, and payment rails that card networks and processors were already rebuilding for machine customers.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 }
            ]),
            "The prediction deliberately set a hard, public number. Five percent of a major retailer's online sales through agentic checkout is the difference between a feature and a channel. The paired condition, $5 billion of AI agent ad spend, tests whether a real market forms around influencing agents the way one formed around influencing search results."
          ]
        },
        {
          heading: "What would count as a hit?",
          body: [
            "The clean evidence is a major retailer stating, in earnings, an investor letter, or a holiday recap, that more than 5% of online sales came through agentic checkout: purchases completed by an agent, not merely assisted by AI search.",
            "The advertising half is harder to grade because no public tracker of agent ad spend exists yet. Credible third-party estimates putting the category at $5 billion would clear it. Conflating AI-influenced revenue with agent-completed revenue would not, and retailers have every incentive to blur that line."
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "Whoever owns the agent owns the demand. If checkout moves inside the conversation, product discovery collapses into model answers, and the retailer's relationship with the customer runs through someone else's assistant.",
            "Retailers face the platform dilemma in its purest form: integrate and give up the customer relationship, or resist and give up the sale. The advertising market restructures around the same shift, from persuading people to being retrievable and preferred by agents."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching retailer earnings calls for the first hard agentic-checkout disclosures, adoption of the Agentic Commerce Protocol and rival agent-payment standards, and whether ChatGPT commerce expands from single-item purchases into carts, comparisons, and repeat orders.",
            "On the advertising side, the signal is a real product: paid placement or sponsored eligibility inside agent recommendations, priced at scale. This prediction is graded in the State of AI Report 2026, publishing in October."
          ]
        }
      ],
      faq: [
        {
          q: "What share of online sales do AI agents actually drive?",
          a: linked("Salesforce attributed about 20% of global online holiday sales in 2025, $262 billion, to AI and agent influence. Sales completed end-to-end by an agent are far smaller and not yet publicly broken out by any major retailer, which is exactly what our prediction waits for.", [
            { text: "Salesforce attributed", url: SOURCES.salesforceHoliday }
          ])
        },
        {
          q: "What is the Agentic Commerce Protocol?",
          a: linked("An open standard, built by OpenAI and Stripe and released in September 2025, that lets AI agents complete purchases from merchants without the merchant rebuilding its backend. It powers Instant Checkout in ChatGPT.", [
            { text: "built by OpenAI and Stripe", url: SOURCES.stripeACP }
          ])
        },
        {
          q: "When will this prediction be graded?",
          a: "In the State of AI Report 2026, published in October 2026. The verdict and its justification will appear on the public predictions scorecard."
        }
      ],
      related: [
        "ai-agents-scientific-discovery",
        "federal-vs-state-ai-regulation",
        "how-accurate-is-the-state-of-ai-report"
      ]
    },
    {
      slug: "ai-cyber-attack-diplomacy",
      ogImage: "predictions-ai-cyber-attack-diplomacy.png",
      type: "essay",
      title: "When Does an AI Attack Become a Diplomatic Incident?",
      seoTitle: "AI Cyber Attacks and the First Emergency Debate | State of AI",
      dek: "The capability has been demonstrated and the forum exists. What is missing, so far, is the incident big enough to force them together.",
      description: "AI-orchestrated cyberattacks are real: Anthropic disclosed one in 2025. When does an AI attack trigger an emergency NATO or UN security debate?",
      keywords: ["AI cyber attack", "AI-orchestrated cyberattack", "deepfake security threat", "UN AI security debate", "AI espionage", "agentic AI attacks"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-09",
      lastUpdated: "2026-07-09",
      answer: "An AI-orchestrated cyberattack has already happened: Anthropic disclosed a Chinese state-sponsored campaign in November 2025 in which its own model executed 80 to 90% of the operation. The UN Security Council has debated AI security, but only as a scheduled session. Our prediction requires an attack severe enough to trigger an emergency NATO or UN debate, and that has not happened yet.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-4",
          text: "A deepfake/agent-driven cyber attack triggers the first NATO/UN emergency debate on AI security.",
          status: "Pending"
        }
      ],
      sections: [
        {
          heading: "Has an AI-orchestrated attack already happened?",
          body: [
            linked("Yes. In November 2025, Anthropic disclosed that a Chinese state-sponsored group it designates GTG-1002 had used Claude Code to run what it called the first reported AI-orchestrated cyber espionage campaign: roughly 30 targets across technology, finance, chemicals, and government, with the model executing 80 to 90% of the operation and issuing thousands of requests at speeds no human team could match.", [
              { text: "Anthropic disclosed", url: SOURCES.anthropicEspionage }
            ]),
            "The honest caveats matter. The operators jailbroke the model by posing as a defensive security firm, the system hallucinated in ways that limited the damage, and only a subset of intrusions succeeded. But the direction is unmistakable: the marginal cost of a sophisticated intrusion campaign is collapsing toward the price of tokens."
          ]
        },
        {
          heading: "Why did we make the call?",
          body: [
            linked("The 2025 State of AI Report argued that agentic misuse and synthetic media were converging into a new class of security incident: attacks that scale like software while attribution still moves at the speed of intelligence agencies. Deepfake-enabled fraud had already produced eight-figure corporate losses; agent frameworks were making the offensive tooling general-purpose.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 }
            ]),
            "The prediction was that this would stop being a technology story and become a collective-security one: a specific incident severe enough that NATO or the United Nations convenes urgently in response. Institutions signal what they consider a security matter by what they hold emergency sessions about."
          ]
        },
        {
          heading: "What would count as a hit?",
          body: [
            linked("The forum already exists in scheduled form. The UN Security Council held its first high-level open debate on AI and international peace and security in September 2025, where the Secretary-General warned that humanity's fate cannot be left to an algorithm. A calendared thematic debate does not clear the bar.", [
              { text: "first high-level open debate", url: SOURCES.unscAIDebate }
            ]),
            "The hit requires causation: an emergency or urgent session of the UN Security Council, or NATO consultations of the kind invoked under Article 4, convened in response to a specific deepfake or agent-driven attack. The Anthropic disclosure produced congressional letters and agency briefings, but no emergency multilateral debate. Capability demonstrated; threshold not yet crossed."
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "An emergency debate would mark the moment AI security enters the machinery built for wars and invasions rather than the machinery built for tech policy. That changes who is in the room, what powers are available, and how fast norms form.",
            "It would also force the attribution question into the open. When a model executes 90% of an operation, responsibility is split between the state that directed it, the operators who jailbroke it, and the provider whose infrastructure ran it. Collective-security institutions have no doctrine for that split. The first emergency session will start writing it."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching for state-linked misuse disclosures from other frontier labs, for governments naming AI systems in formal attribution statements, and for deepfake incidents aimed at elections or leaders that demand a multilateral response rather than a domestic one.",
            "The nearest misses will be instructive too: incidents that produce briefings and communiques but stop short of an emergency session tell us where the threshold actually sits. This prediction is graded in the State of AI Report 2026, publishing in October."
          ]
        }
      ],
      faq: [
        {
          q: "What was the first AI-orchestrated cyberattack?",
          a: linked("The campaign Anthropic disclosed in November 2025: a Chinese state-sponsored group used Claude Code against roughly 30 targets, with the model executing 80 to 90% of the operation. Anthropic described it as the first reported AI-orchestrated cyber espionage campaign.", [
            { text: "Anthropic disclosed in November 2025", url: SOURCES.anthropicEspionage }
          ])
        },
        {
          q: "Has the UN held an emergency session on AI?",
          a: linked("No. The UN Security Council held its first high-level open debate on AI and international security in September 2025, but that was a scheduled session. No emergency debate triggered by a specific AI attack has occurred.", [
            { text: "first high-level open debate", url: SOURCES.unscAIDebate }
          ])
        },
        {
          q: "Why would an AI attack involve NATO?",
          a: "A sufficiently damaging attack on a member state could trigger Article 4 consultations, the mechanism members use when they consider their security threatened. An AI-driven attack would raise novel attribution questions: the state that directed it, the operators who ran it, and the model provider all sit in different jurisdictions."
        }
      ],
      related: [
        "open-models-geopolitics",
        "ai-infrastructure-politics",
        "calls-we-got-right"
      ]
    },
    {
      slug: "federal-vs-state-ai-regulation",
      ogImage: "predictions-federal-vs-state-ai-regulation.png",
      type: "essay",
      title: "Who Gets to Regulate AI in America?",
      seoTitle: "Trump's AI Executive Order vs State AI Laws | State of AI",
      dek: "Half of this prediction resolved within two months of publication. The other half is now in the hands of federal judges.",
      description: "Trump's December 2025 executive order directs the DOJ to challenge state AI laws. Whether the courts uphold it decides who regulates AI in America.",
      keywords: ["state AI laws", "AI executive order preemption", "federal AI regulation", "AI Litigation Task Force", "Colorado AI Act", "state AI law preemption"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-09",
      lastUpdated: "2026-07-09",
      answer: "Partially resolved. President Trump signed an executive order in December 2025 directing the Justice Department to challenge state AI laws in federal court, and an AI Litigation Task Force stood up in January 2026. Whether the Supreme Court ultimately finds the effort unconstitutional, the second half of our prediction, remains open.",
      predictions: [
        {
          label: "2025 prediction",
          id: "P2025-10",
          text: "Trump issues an executive order to ban state AI legislation that SCOTUS finds unconstitutional.",
          status: "Pending"
        }
      ],
      sections: [
        {
          heading: "What did the executive order actually do?",
          body: [
            linked("On December 11, 2025, the White House issued an executive order establishing a national AI policy framework aimed at what it calls state law obstruction. Rather than banning state statutes outright, it directs the Attorney General to stand up an AI Litigation Task Force whose sole job is to challenge state AI laws in federal court, on interstate commerce, federal preemption, and other constitutional grounds.", [
              { text: "executive order", url: SOURCES.aiPreemptionEO }
            ]),
            "The order carves out state laws on child safety, data center permitting, and government procurement, and it cannot itself erase a state statute. That is the constitutionally careful version of the idea: preemption by lawsuit, not by decree. It is also what makes the outcome a question for judges rather than for the administration."
          ]
        },
        {
          heading: "Why did we predict a constitutional collision?",
          body: [
            linked("The 2025 State of AI Report was published weeks after the Senate stripped a ten-year moratorium on state AI laws out of the July reconciliation bill by 99 votes to 1. The appetite for federal preemption had not died; it had lost its legislative vehicle. With Colorado, California, and Texas enacting AI statutes and hundreds more state bills in motion, a collision was structurally likely.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 }
            ]),
            "Our call was that the administration would reach for executive action, and that the courts would have the final word. The first part arrived within two months. The second is why the prediction remains pending rather than partially graded early."
          ]
        },
        {
          heading: "What would count as a hit?",
          body: [
            linked("The wording is two-part and strict: an executive order against state AI legislation, and a Supreme Court finding of unconstitutionality. The order exists, though it litigates rather than bans, a distinction that will matter at grading time. Legal analyses of the preemption push note that executive-branch preemption without a congressional statute rests on contested ground.", [
              { text: "Legal analyses of the preemption push", url: SOURCES.statePreemptionAnalysis }
            ]),
            "A clean hit needs the Supreme Court to rule against the order or its key applications. Lower-court injunctions alone would argue for a partial. If the Task Force's suits succeed or never mature to the Court within the window, the miss is ours, and the grading note will say why. Litigation clocks are unkind to twelve-month predictions, and we knew that when we made the call."
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "The outcome decides whether the US gets one AI rulebook or fifty. Labs and deployers currently face a patchwork: comprehensive algorithmic-discrimination rules in Colorado, frontier-model transparency in California, and divergent obligations forming elsewhere.",
            "It is also a global signal. The US spent 2025 arguing that innovation requires regulatory restraint. Whether that position is enforced by Washington against its own states, and whether the Constitution permits it, tells other governments how durable the American posture is."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "We are watching the AI Litigation Task Force's first lawsuits and their targets, whether Colorado's AI Act and California's frontier transparency law head the list, and how quickly district and circuit courts rule.",
            "The parallel track is Congress: a federal AI statute with an express preemption clause would moot the executive-order fight and resolve the question the durable way. This prediction is graded in the State of AI Report 2026, publishing in October."
          ]
        }
      ],
      faq: [
        {
          q: "Did Trump sign an executive order against state AI laws?",
          a: linked("Yes. The order, signed December 11, 2025, directs the Justice Department to challenge state AI laws in federal court through an AI Litigation Task Force, rather than attempting to nullify them directly. It carves out child safety, data center permitting, and state procurement laws.", [
            { text: "signed December 11, 2025", url: SOURCES.aiPreemptionEO }
          ])
        },
        {
          q: "Can the federal government preempt state AI laws?",
          a: "Through Congress, clearly: a federal statute with an express preemption clause would control. Through executive action alone, it is contested, which is precisely the constitutional question our prediction turns on. The executive order's litigation-first design is an acknowledgment of that limit."
        },
        {
          q: "Which state AI laws are most exposed?",
          a: "Comprehensive algorithmic-discrimination regimes such as Colorado's AI Act and frontier-model transparency laws such as California's are the most likely early targets, since they most directly regulate model developers across state lines. The order's carve-outs shield child-safety and infrastructure-permitting laws."
        }
      ],
      related: [
        "ai-infrastructure-politics",
        "open-models-geopolitics",
        "how-accurate-is-the-state-of-ai-report"
      ]
    },
    {
      slug: "why-we-were-wrong-about-apple",
      ogImage: "predictions-why-we-were-wrong-about-apple.png",
      type: "essay",
      title: "Why We Were Wrong About Apple",
      seoTitle: "Why We Were Wrong About Apple and On-Device AI | State of AI",
      dek: "We bet that Apple's research would set the pace for personal, on-device AI. The trend arrived. Apple's research did not drive it, and Apple ended up renting the frontier.",
      description: "Why the State of AI Report's Apple on-device AI prediction missed: Apple Intelligence delays, the Siri slip, and the $1 billion Gemini deal.",
      keywords: ["Apple AI miss", "Apple Intelligence delay", "Apple Google Gemini deal", "on-device AI", "Siri AI", "AI prediction miss"],
      sourceReportUrl: "https://www.stateof.ai/2024",
      datePublished: "2026-07-09",
      lastUpdated: "2026-07-09",
      answer: "We were wrong about the protagonist, not the trend. Personal AI momentum built through 2025, but it was driven by small open-weight models and rival assistants rather than Apple's research. Apple Intelligence underwhelmed, the Siri upgrade slipped to 2026, and in January 2026 Apple agreed to pay Google roughly $1 billion a year for a custom Gemini model to power Siri.",
      predictions: [
        {
          label: "2024 prediction",
          id: "P2024-8",
          text: "Strong results from Apple's on-device research accelerate momentum around personal on-device AI.",
          status: "Miss"
        }
      ],
      sections: [
        {
          heading: "What was the original call?",
          body: [
            linked("The 2024 State of AI Report noted that Apple was publishing credible research on efficient on-device inference and small models, and predicted that strong results would accelerate momentum around personal on-device AI. The prior looked reasonable: two billion devices, custom silicon, a privacy posture built for local processing.", [
              { text: "2024 State of AI Report", url: SOURCES.state2024 }
            ]),
            "The trend half of the call was right. Personal AI and capable on-device models did gain momentum through 2025. The protagonist half failed: Apple's research was not what accelerated it."
          ]
        },
        {
          heading: "What actually happened?",
          body: [
            "Apple Intelligence shipped in stages and landed softly. The rebuilt Siri, the product that would have proven the thesis, slipped repeatedly into 2026. Meanwhile the actual accelerants of on-device AI came from elsewhere: open-weight small models that run on consumer hardware and an NPU-equipped device cycle across the industry.",
            linked("Then came the concession. In January 2026, Apple confirmed it would pay Google roughly $1 billion a year for a custom 1.2 trillion parameter Gemini model to power the new Siri, running under Apple's Private Cloud Compute so the data stays in Apple's trust boundary. The company with the strongest on-device distribution in the world chose to rent the intelligence.", [
              { text: "pay Google roughly $1 billion a year", url: SOURCES.appleGemini }
            ]),
            "The scorecard grades the prediction a miss on exactly that ground: on-device AI momentum arrived, but Apple's own research did not meaningfully drive the trend."
          ]
        },
        {
          heading: "Why did we get it wrong?",
          body: [
            "We inferred product velocity from research output. Apple's papers were real, but publishing efficient-inference research and shipping a frontier-quality assistant are different organizational capabilities, and we scored the first as evidence of the second.",
            "We also underweighted how much frontier scale would matter for assistant quality. The personal AI race was won by whoever had the best large model to distill from or rent, not the best on-device optimizations. Small models became genuinely useful, but the intelligence people wanted in an assistant kept living at a scale Apple had not built."
          ]
        },
        {
          heading: "Why does the miss matter?",
          body: [
            linked("It is the cleanest example of a failure mode that shows up elsewhere in our track record: right trend, wrong protagonist. Like the humanoids miss, it collapses two forecasts into one, what happens and who makes it happen, and the second is much harder. The pattern is documented in the accuracy analysis.", [
              { text: "accuracy analysis", url: SOURCES.accuracy }
            ]),
            "There is also a specific lesson about Apple. Its historical strength is adopting late and integrating well, not leading research categories. Predicting Apple as the research protagonist ignored Apple's own operating history. Buying Gemini may prove an excellent product decision; our forecast about how the momentum would arrive was still wrong."
          ]
        },
        {
          heading: "What we are watching now",
          body: [
            "Whether the Gemini-powered Siri actually ships well and moves personal AI usage on iPhone, and whether Apple's in-house models close the gap enough to bring the workload back inside.",
            linked("On the trend itself, the interesting frontier is how capable small open-weight models get: releases like gpt-oss-20b already run on 16 GB consumer hardware, which keeps the original thesis alive even though the actor changed. We were wrong about Apple; on-device intelligence is doing fine.", [
              { text: "gpt-oss-20b", url: SOURCES.gptOss }
            ])
          ]
        }
      ],
      faq: [
        {
          q: "Why did Apple pay Google for Gemini?",
          a: linked("Apple's in-house models were not ready to power the rebuilt Siri on the timeline customers expected, so Apple agreed to pay Google roughly $1 billion a year for a custom 1.2 trillion parameter Gemini model, served inside Apple's Private Cloud Compute.", [
            { text: "pay Google roughly $1 billion a year", url: SOURCES.appleGemini }
          ])
        },
        {
          q: "Was Apple Intelligence a failure?",
          a: "It shipped, but the assistant that mattered slipped to 2026 and the flagship intelligence is now rented from Google. Our miss is narrower than a verdict on Apple: the prediction claimed Apple's research would drive industry momentum, and it did not."
        },
        {
          q: "What actually drove on-device AI momentum?",
          a: linked("Small open-weight models and the NPU hardware cycle. Releases like gpt-oss-20b brought near-frontier reasoning to 16 GB consumer machines, and every major chipmaker shipped dedicated AI silicon. The trend our prediction pointed at was real; the credit went elsewhere.", [
            { text: "gpt-oss-20b", url: SOURCES.gptOss }
          ])
        }
      ],
      related: [
        "why-we-were-wrong-about-humanoids",
        "how-accurate-is-the-state-of-ai-report",
        "open-models-geopolitics"
      ]
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { PREDICTION_PAGES };
  }

  global.PREDICTION_PAGES = PREDICTION_PAGES;
})(typeof window !== "undefined" ? window : globalThis);
