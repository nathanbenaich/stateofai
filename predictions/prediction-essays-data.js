(function (global) {
  "use strict";

  const SOURCES = {
    state2025: "https://www.stateof.ai/",
    state2024: "https://www.stateof.ai/2024",
    state2023: "https://www.stateof.ai/2023",
    predictions: "https://www.stateof.ai/predictions",
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
    aiActionPlan: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf?inline=1",
    stanfordAI2025: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    stanfordAI2026Performance: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
    artificialAnalysisChina: "https://artificialanalysis.ai/downloads/china-report/2025/Artificial-Analysis-State-of-AI-China-Q2-2025-Highlights.pdf",
    artificialAnalysisModels: "https://artificialanalysis.ai/leaderboards/models",
    lmarena: "https://lmarena.ai/leaderboard",
    lbnlDataCenters: "https://energyanalysis.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report",
    doeDataCenters: "https://www.energy.gov/oe/clean-energy-resources-meet-data-center-electricity-demand",
    sagAftraAI: "https://www.sagaftra.org/contracts-industry-resources/contracts/2023-tvtheatrical-contracts/artificial-intelligence-resources",
    wgaAI: "https://www.wga.org/uploadedfiles/contracts/2023_mba_moa.pdf",
    c2pa: "https://c2pa.org/specifications/specifications/2.2/explainer/Explainer.html",
    humanoidsAssessment: "https://www.gov.uk/government/publications/rapid-technology-assessment-humanoids/rta-humanoids",
    roboticsFunding: "https://www.ieee-ras.org/global-robotics-industry-funding-report-2025/"
  };

  function linked(text, links) {
    return { text, links: links || [] };
  }

  const PREDICTION_PAGES = [
    {
      slug: "calls-we-got-right",
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
        "Prediction is not the point of the State of AI Report. The point is taste under uncertainty: noticing which weak signals are turning into the structure of the field.",
        linked("The public scorecard keeps us honest. The calls below mattered because they anticipated a change in how AI would be built, funded, regulated, or understood.", [
          { text: "public scorecard", url: SOURCES.predictions }
        ])
      ],
      receipts: [
        {
          year: "2020 -> 2021",
          status: "Hit",
          prediction: "Attention-based networks move from NLP to computer vision, achieving SOTA results.",
          happened: linked("Google's Vision Transformer paper showed that a pure transformer could match or outperform leading convolutional networks on image classification.", [
            { text: "Vision Transformer paper", url: SOURCES.visionTransformer }
          ]),
          mattered: "Transformers were no longer a language trick. They were becoming the general architecture of AI.",
        },
        {
          year: "2020 -> 2021",
          status: "Hit",
          prediction: "NVIDIA does not end up completing its acquisition of Arm.",
          happened: linked("NVIDIA and SoftBank terminated the transaction in February 2022, citing significant regulatory challenges.", [
            { text: "terminated the transaction", url: SOURCES.nvidiaArm }
          ]),
          mattered: "AI compute was already too strategically important for neutral chip infrastructure to change hands quietly.",
        },
        {
          year: "2022 -> 2023",
          status: "Hit",
          prediction: "GAFAM invests >$1B into an AGI or open-source AI company.",
          happened: linked("Microsoft described its January 2023 commitment to OpenAI as a multiyear, multibillion-dollar investment.", [
            { text: "multiyear, multibillion-dollar investment", url: SOURCES.microsoftOpenAI }
          ]),
          mattered: "Frontier AI labs and hyperscale clouds became financially and technically interdependent.",
        },
        {
          year: "2023 -> 2024",
          status: "Hit",
          prediction: "The US FTC or UK CMA investigate the Microsoft/OpenAI deal on competition grounds.",
          happened: linked("The CMA began examining whether the partnership created a relevant merger situation in December 2023, while the FTC issued orders examining the Microsoft/OpenAI investment alongside other cloud-lab partnerships.", [
            { text: "CMA began examining", url: SOURCES.cmaOpenAI },
            { text: "FTC issued orders", url: SOURCES.ftcAIInquiry }
          ]),
          mattered: "AI market power started being examined through cloud, compute, distribution, and control without ownership.",
        },
        {
          year: "2024 -> 2025",
          status: "Hit",
          prediction: "An open-source alternative to OpenAI o1 surpasses it across a range of reasoning benchmarks.",
          happened: linked("DeepSeek-R1 reported results above OpenAI o1 on AIME 2024, MATH-500, and SWE-bench Verified.", [
            { text: "DeepSeek-R1", url: SOURCES.deepseekR1 }
          ]),
          mattered: "Reasoning advantages diffused faster than the closed-model story implied.",
        },
        {
          year: "2020 -> 2021",
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
          year: "2022 -> 2023",
          status: "Hit",
          prediction: "More than $100M is invested in dedicated AI alignment organisations in the next year.",
          happened: linked("Anthropic raised $450 million in May 2023 and said the financing would support further AI safety research.", [
            { text: "raised $450 million", url: SOURCES.anthropicSeriesC }
          ]),
          mattered: "AI safety stopped being a small research subculture and became part of the frontier-lab capital stack.",
        },
        {
          year: "2022 -> 2023",
          status: "Hit",
          prediction: "A major UGC site negotiates a commercial settlement with an AI model maker for training data.",
          happened: linked("Shutterstock signed a six-year agreement licensing image, video, music, and metadata to OpenAI for model training.", [
            { text: "six-year agreement", url: SOURCES.shutterstockOpenAI }
          ]),
          mattered: "Training data became a commercial and legal asset class.",
        },
        {
          year: "2023 -> 2024",
          status: "Hit",
          prediction: "Limited progress on global AI governance beyond high-level voluntary commitments.",
          happened: linked("The Bletchley and Seoul summits produced declarations and voluntary frontier-safety commitments, but no binding global enforcement regime.", [
            { text: "Bletchley", url: SOURCES.bletchleyDeclaration },
            { text: "Seoul", url: SOURCES.seoulDeclaration }
          ]),
          mattered: "The diplomacy moved faster than the institutions capable of enforcement.",
        },
        {
          year: "2024 -> 2025",
          status: "Hit",
          prediction: "A research paper generated by an AI Scientist is accepted at a major ML conference or workshop.",
          happened: linked("Sakana AI's AI Scientist-v2 produced a paper that cleared an ICLR workshop's review threshold before being withdrawn under a pre-agreed research protocol.", [
            { text: "AI Scientist-v2", url: SOURCES.aiScientist }
          ]),
          mattered: "Scientific AI crossed from lab automation into the institutions that certify research.",
        }
      ],
      sections: [],
      related: [
        "ai-agents-scientific-discovery",
        "open-models-geopolitics",
        "ai-infrastructure-politics"
      ]
    },
    {
      slug: "ai-agents-scientific-discovery",
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
          text: "Open-ended agents make a meaningful scientific discovery end-to-end (hypothesis, experiment, paper).",
          status: "Pending"
        },
        {
          label: "2024 prediction",
          text: "A research paper generated by an AI Scientist is accepted at a major ML conference or workshop.",
          status: "Hit"
        },
        {
          label: "2023 prediction",
          text: "Self-improving AI agents crush SOTA in a complex environment (AAA game, tool use, science).",
          status: "Miss"
        }
      ],
      sections: [
        {
          heading: "Thesis",
          body: [
            linked("AI systems have moved beyond summarizing papers. Google's AI co-scientist generated hypotheses and experimental protocols; Stanford's Virtual Lab coordinated an AI principal investigator and specialist agents; Sakana AI's AI Scientist-v2 ran machine-learning experiments and wrote the resulting paper.", [
              { text: "AI co-scientist", url: SOURCES.aiCoScientist },
              { text: "Virtual Lab", url: SOURCES.virtualLab },
              { text: "AI Scientist-v2", url: SOURCES.aiScientist }
            ]),
            "None of those systems fully settles the end-to-end question. The hard test is whether an agent can choose a worthwhile hypothesis, decide what evidence matters, run or direct the experiment, survive a negative result, and produce a contribution that peers take seriously."
          ]
        },
        {
          heading: "Why We Made The Call",
          body: [
            linked("The 2025 State of AI Report argued that AI was becoming a scientific collaborator, then made the stronger prediction: an open-ended agent would make a meaningful discovery across hypothesis, experiment, and paper.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 }
            ]),
            "The wording is deliberately strict. A writing assistant is not a scientist, and an agent that optimizes a predefined benchmark has not chosen a scientific question. The call is about ownership of the loop, not fluent output at the end of it."
          ]
        },
        {
          heading: "What Would Count",
          body: [
            "A credible hit requires the AI system to drive the work across hypothesis formation, experimental design or execution, analysis, and the paper or preprint. A human may set the broad domain and provide physical access, but cannot quietly supply the central idea.",
            "The strongest evidence would be independent reproduction, validation by domain experts, or acceptance by a serious scientific venue with the agent's role disclosed. Workshop acceptance alone is evidence of progress, not proof of meaningful discovery."
          ]
        },
        {
          heading: "Why It Matters",
          body: [
            "If an agent can close the loop, scientific AI stops being mainly a productivity tool. Parts of the scientific method become delegable.",
            "The scarce resource then shifts from literature coverage and coding speed toward question selection, experimental access, validation, and systems that can recognize when their own result is weak. That is a much larger change than automating a lab task."
          ]
        },
        {
          heading: "What We Are Watching Now",
          body: [
            "We are watching agentic lab systems that connect literature review, experimental planning, analysis, and revision rather than optimizing one isolated step.",
            "The decisive signals will be papers that credit models for validated hypotheses or experimental choices, plus evaluations that test long-horizon research instead of static scientific question answering."
          ]
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
          text: "A major AI lab leans back into open-sourcing frontier models to win over the current US administration.",
          status: "Pending"
        },
        {
          label: "2024 prediction",
          text: "An open-source alternative to OpenAI o1 surpasses it across a range of reasoning benchmarks.",
          status: "Hit"
        }
      ],
      sections: [
        {
          heading: "Thesis",
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
          heading: "Why We Made The Call",
          body: [
            linked("The 2025 State of AI Report described a harder AI politics: an America-first policy turn, a growing Chinese open-weight ecosystem, and a narrowing frontier. Stanford's 2025 AI Index reached the same directional conclusion: the US still produced more leading models, but China's performance gap was closing quickly.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 },
              { text: "2025 AI Index", url: SOURCES.stanfordAI2025 }
            ]),
            "That creates a strategic dilemma for US labs. Keeping frontier weights closed may protect a capability lead; it may also concede developer mindshare, local deployment, and global distribution to models built elsewhere."
          ]
        },
        {
          heading: "What Would Count",
          body: [
            "The strong version is a major frontier lab releasing, or committing to release, a frontier or near-frontier open-weight model while explicitly framing the decision around US competitiveness, policy access, or national AI strategy.",
            "A routine research release does not clear the bar. The signal is political language around openness, backed by a model capable enough to change developer behavior."
          ]
        },
        {
          heading: "Why It Matters",
          body: [
            "Open-weight models export capability and make an ecosystem easier to adopt, modify, and deploy locally. Each installation can pull developers, tooling, fine-tuning recipes, and infrastructure toward the country or company that set the default.",
            "That makes model-release policy part of foreign policy. The useful question is no longer open versus closed in the abstract. It is whose open ecosystem becomes the world's second stack."
          ]
        },
        {
          heading: "What We Are Watching Now",
          body: [
            "We are watching for US policy speeches that treat open-weight AI as a national advantage, and for labs to shift their release language from research access toward competitiveness and export power.",
            linked("The market signal is whether Chinese open-weight models keep narrowing the gap on broad evaluations while gaining real developer and enterprise adoption. Artificial Analysis's China tracking provides one public measure of that convergence.", [
              { text: "Artificial Analysis's China tracking", url: SOURCES.artificialAnalysisChina }
            ])
          ]
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
      type: "essay",
      title: "AI Infrastructure Is Becoming Local Politics",
      seoTitle: "AI Data Centers Are Becoming Local Politics | State of AI",
      dek: "The AI boom is starting to look less like software and more like heavy industry: land, power, water, permits, grids, and voters.",
      description: "Why AI data centers are becoming a local political issue through electricity demand, water use, grid constraints, land, and permitting.",
      keywords: ["AI data center politics", "data center electricity demand", "AI infrastructure", "data center NIMBYism", "sovereign AI"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "AI data centers become local politics when their demand for power, water, land, transmission, and permits affects household bills and development choices. At that point, frontier AI depends on political permission as much as chips and capital.",
      predictions: [
        {
          label: "2025 prediction",
          text: "Datacenter NIMBYism takes the US by storm and sways certain 2026 midterm/gubernatorial elections.",
          status: "Pending"
        },
        {
          label: "2025 prediction",
          text: "'AI neutrality' emerges as a foreign-policy doctrine as some nations cannot or fail to develop sovereign AI.",
          status: "Pending"
        },
        {
          label: "2024 prediction",
          text: "A $10B+ investment from a sovereign state into a US large AI lab invokes national security review.",
          status: "Partial"
        }
      ],
      sections: [
        {
          heading: "Thesis",
          body: [
            linked("The industrial era of AI has substations, cooling systems, land deals, transmission lines, and neighbors. Lawrence Berkeley National Laboratory estimates that US data centers used 4.4% of electricity in 2023 and could reach 6.7% to 12% by 2028.", [
              { text: "Lawrence Berkeley National Laboratory estimates", url: SOURCES.lbnlDataCenters }
            ]),
            "Once that load becomes visible in electricity bills, water debates, and planning fights, AI stops being a distant software story. It becomes ordinary local politics."
          ]
        },
        {
          heading: "Why We Made The Call",
          body: [
            linked("The 2025 State of AI Report put multi-gigawatt data centers and power constraints at the center of frontier competition. The US Department of Energy separately warned that data centers could consume up to 9% of US electricity by 2030, from 4% in 2023.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 },
              { text: "Department of Energy", url: SOURCES.doeDataCenters }
            ]),
            "The next bottleneck may therefore be permission as much as silicon. The sovereign AI debate creates a second constraint: not every country can finance its own stack, and not every country wants to become dependent on one geopolitical bloc's infrastructure."
          ]
        },
        {
          heading: "What Would Count",
          body: [
            "For data center politics, the hard evidence is a campaign ad, debate, poll, candidate platform, or post-election analysis showing that an AI infrastructure project materially shaped a state or local race.",
            "For AI neutrality, the clean evidence is a government or bloc formally adopting non-alignment in compute procurement, model access, cloud infrastructure, or technical standards."
          ]
        },
        {
          heading: "Why It Matters",
          body: [
            "AI infrastructure puts the industry in contact with voters who may never follow a benchmark but do care about power prices, water use, construction, jobs, and who captures the upside.",
            "Those voters can slow projects, change utility rules, redirect investment, and reshape the geography of frontier AI. A model race that looks global from San Francisco can still be decided by a county permit."
          ]
        },
        {
          heading: "What We Are Watching Now",
          body: [
            "We are watching state and local permitting fights, new utility tariffs for very large loads, and grid operators naming AI demand as a material planning risk.",
            "Internationally, the signal is whether governments frame cloud and model procurement as non-alignment rather than simply choosing the cheapest US, Chinese, European, or regional provider."
          ]
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
          text: "A movie or short film produced with significant use of AI wins major audience praise and sparks backlash.",
          status: "Pending"
        },
        {
          label: "2025 prediction",
          text: "A real-time generative video game becomes the year's most-watched title on Twitch.",
          status: "Pending"
        },
        {
          label: "2023 prediction",
          text: "A Hollywood-grade production makes use of generative AI for visual effects.",
          status: "Hit"
        },
        {
          label: "2023 prediction",
          text: "An AI-generated song breaks into the Billboard Hot 100 Top 10 or Spotify Top Hits 2024.",
          status: "Hit"
        }
      ],
      sections: [
        {
          heading: "Thesis",
          body: [
            linked("The first AI media debate asked whether the outputs were good enough. The next asks whether the process is legitimate. The 2023 WGA agreement states that generative AI is not a writer, while SAG-AFTRA's negotiated protections require consent and compensation around digital replicas.", [
              { text: "2023 WGA agreement", url: SOURCES.wgaAI },
              { text: "SAG-AFTRA's negotiated protections", url: SOURCES.sagAftraAI }
            ]),
            "A work can be technically impressive, emotionally effective, and still trigger a fight over labor, authorship, disclosure, and taste. That tension only becomes culturally important once the audience wants to watch."
          ]
        },
        {
          heading: "Why We Made The Call",
          body: [
            linked("The 2023 State of AI Report predicted that a Hollywood-grade production would use generative AI for visual effects. By the 2025 prediction cycle, the capability question had become less interesting than the audience response.", [
              { text: "2023 State of AI Report", url: SOURCES.state2023 }
            ]),
            "That is why the new call pairs praise with backlash. If everyone hates the work, it is a failed product. If everyone accepts it, there is no cultural rupture. The live wire is both at once."
          ]
        },
        {
          heading: "What Would Count",
          body: [
            "For film, the work must use generative AI materially, earn real audience praise, and provoke a meaningful public or industry backlash. A marketing stunt, background asset, or pile-on around a bad trailer is not enough.",
            "For games, real-time generation must be a core mechanic rather than an asset-production shortcut, and it must drive sustained audience attention on Twitch rather than a brief novelty spike."
          ]
        },
        {
          heading: "Why It Matters",
          body: [
            linked("Media is where AI becomes emotionally legible to the public. Provenance systems such as Content Credentials can disclose how a work was made, but disclosure does not decide whether audiences regard the process as fair or the result as art.", [
              { text: "Content Credentials", url: SOURCES.c2pa }
            ]),
            "Cultural acceptance is therefore a product constraint, not a communications problem. Entertainment companies will have to decide how much AI use to disclose, what labor bargain supports it, and whether the audience believes the humans involved still authored the work."
          ]
        },
        {
          heading: "What We Are Watching Now",
          body: [
            "We are watching festival selections, streaming releases, and viral shorts with disclosed AI-heavy production, followed by how creators, unions, and audiences react once the production method becomes part of the story.",
            "In games, the signal is whether generative systems change the live viewing experience rather than simply lowering development costs behind the scenes."
          ]
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
      type: "essay",
      title: "Could China Take The Frontier AI Lead?",
      seoTitle: "Could China Take the Frontier AI Lead? | State of AI",
      dek: "The question is no longer whether Chinese labs can build excellent models. It is whether one of them can create a public frontier moment that changes global perception.",
      description: "Could China take the frontier AI lead? The State of AI Report examines Chinese models, open weights, benchmarks, and the narrowing US-China gap.",
      keywords: ["China frontier AI lead", "US China AI race", "Chinese AI models", "DeepSeek", "Qwen", "AI model leaderboards"],
      sourceReportUrl: "https://www.stateof.ai/",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "Yes, a Chinese lab could take a visible frontier lead. Stanford's 2026 AI Index says the US-China model performance gap has effectively closed; the unresolved question is whether a Chinese model reaches number one on a major broad leaderboard and holds it long enough to change market perception.",
      predictions: [
        {
          label: "2025 prediction",
          text: "A Chinese lab overtakes the US-dominated frontier on a major leaderboard (e.g. LMArena / Artificial Analysis).",
          status: "Pending"
        },
        {
          label: "2018 prediction",
          text: "A lab located in China makes a significant research breakthrough.",
          status: "Hit"
        },
        {
          label: "2024 prediction",
          text: "An open-source alternative to OpenAI o1 surpasses it across a range of reasoning benchmarks.",
          status: "Hit"
        }
      ],
      sections: [
        {
          heading: "Thesis",
          body: [
            linked("The frontier is technical, but it is also social. Stanford's 2026 AI Index concludes that the US-China model performance gap has effectively closed. Public leaderboards matter because practitioners, buyers, policymakers, and the press use them to coordinate their beliefs about who leads.", [
              { text: "Stanford's 2026 AI Index", url: SOURCES.stanfordAI2026Performance }
            ]),
            "A Chinese lab reaching number one on a major broad leaderboard would not settle the AI race. It would puncture the default assumption that the public frontier is structurally American."
          ]
        },
        {
          heading: "Why We Made The Call",
          body: [
            linked("The 2025 State of AI Report described OpenAI's lead as narrow and competition from DeepSeek, Qwen, and Kimi as increasingly credible. DeepSeek-R1 then showed that a Chinese open-weight model could match or beat a leading US reasoning model across several published evaluations.", [
              { text: "2025 State of AI Report", url: SOURCES.state2025 },
              { text: "DeepSeek-R1", url: SOURCES.deepseekR1 }
            ]),
            linked("Chinese labs have used open releases as distribution, not just disclosure. Artificial Analysis tracked the US-China open-weight frontier converging through 2025, which means a leaderboard result can travel quickly into local deployments and developer tools.", [
              { text: "Artificial Analysis", url: SOURCES.artificialAnalysisChina }
            ])
          ]
        },
        {
          heading: "What Would Count",
          body: [
            "The clean evidence is a Chinese lab reaching number one on a major, widely followed frontier-model leaderboard such as LMArena or the Artificial Analysis Intelligence Index.",
            "A narrow subtask win does not clear the bar. The result should cover broad model capability, remain visible after routine leaderboard updates, and be strong enough to affect practitioner perception."
          ]
        },
        {
          heading: "Why It Matters",
          body: [
            "A public frontier lead would change procurement, policy, developer adoption, and the geopolitical narrative around AI capability. Countries choosing models and infrastructure would have evidence that frontier quality is not exclusive to the US stack.",
            "It would also force US labs to respond through price, openness, release cadence, or new evaluation claims. The immediate consequence may be commercial before it is geopolitical."
          ]
        },
        {
          heading: "What We Are Watching Now",
          body: [
            linked("We are watching Chinese models on LMArena and Artificial Analysis, then checking whether apparent wins survive across coding, reasoning, and multimodal evaluations.", [
              { text: "LMArena", url: SOURCES.lmarena },
              { text: "Artificial Analysis", url: SOURCES.artificialAnalysisModels }
            ]),
            "The second signal is distribution: open-weight Chinese releases becoming default developer choices outside China, followed by US labs treating their quality as a strategic threat rather than a benchmark inconvenience."
          ]
        }
      ],
      related: [
        "open-models-geopolitics",
        "calls-we-got-right",
        "ai-infrastructure-politics"
      ]
    },
    {
      slug: "why-we-were-wrong-about-humanoids",
      type: "essay",
      title: "Why We Were Wrong About Humanoids",
      seoTitle: "Why We Were Wrong About Humanoid Robots | State of AI",
      dek: "We thought humanoid investment would trail off as product-market fit stayed elusive. The product question was reasonable. The capital-markets call was wrong.",
      description: "Why the State of AI Report was wrong about humanoid robot investment, and what the miss reveals about product-market fit, capital, and platform bets.",
      keywords: ["humanoid robot investment", "humanoid robotics funding", "AI prediction miss", "robotics product-market fit", "State of AI Report"],
      sourceReportUrl: "https://www.stateof.ai/2024",
      datePublished: "2026-07-08",
      lastUpdated: "2026-07-09",
      answer: "We were wrong because we treated product-market fit as the near-term constraint on humanoid investment. Investors instead funded the option that foundation models could turn embodied AI into a platform, allowing capital to accelerate well before repeatable deployment economics were proven.",
      predictions: [
        {
          label: "2024 prediction",
          text: "Investment in humanoids trails off as companies struggle to achieve product-market fit.",
          status: "Miss"
        }
      ],
      sections: [
        {
          heading: "Thesis",
          body: [
            linked("The original skepticism was about deployment. Humanoid robots had impressive demos, expensive hardware, difficult integration, and uncertain near-term product-market fit. A UK government technology assessment reached a similarly cautious conclusion on technical maturity, applications, and public acceptance.", [
              { text: "UK government technology assessment", url: SOURCES.humanoidsAssessment }
            ]),
            "That deployment skepticism may still prove directionally right. The mistake was assuming that product-market fit would be the near-term constraint on capital."
          ]
        },
        {
          heading: "What Happened",
          body: [
            linked("Instead of trailing off, humanoid investment accelerated. The State of AI scorecard marks the prediction as a miss: roughly $3 billion was invested in humanoids in 2025, up from $1.4 billion in 2024. The IEEE Robotics and Automation Society's 2025 funding report documents the wider surge in robotics capital.", [
              { text: "State of AI scorecard", url: SOURCES.predictions },
              { text: "2025 funding report", url: SOURCES.roboticsFunding }
            ]),
            "Investors were not only underwriting current deployments. They were buying option value on embodied AI becoming a platform category."
          ]
        },
        {
          heading: "Why We Got It Wrong",
          body: [
            "We overweighted product-market fit and underweighted narrative gravity. Foundation models made general-purpose robotics feel newly plausible, and capital became willing to finance the bridge from demos to deployment.",
            "In an AI platform cycle, financing can precede evidence by years. Sometimes that is exuberance. Sometimes it is the only way a hardware category with factories, data collection, and long integration cycles gets built. Our prediction collapsed those possibilities into a single near-term funding call."
          ]
        },
        {
          heading: "Why It Matters",
          body: [
            "The miss separates two questions that we treated as one: will humanoids work commercially, and will capital keep funding the attempt?",
            "Those questions can have different answers for several years. A useful robotics forecast must specify whether it concerns technical capability, repeat deployment, unit economics, or financing appetite."
          ]
        },
        {
          heading: "What We Are Watching Now",
          body: [
            "The evidence that matters now is repeat deployment beyond pilots: renewal, utilization, intervention rates, maintenance burden, safety, and integration cost.",
            "We are also watching whether foundation-model progress translates into robust manipulation and autonomy in messy environments. Capital answered one question. Customers still have to answer the other."
          ]
        }
      ],
      related: [
        "calls-we-got-right",
        "ai-media-backlash",
        "ai-agents-scientific-discovery"
      ]
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { PREDICTION_PAGES };
  }

  global.PREDICTION_PAGES = PREDICTION_PAGES;
})(typeof window !== "undefined" ? window : globalThis);
