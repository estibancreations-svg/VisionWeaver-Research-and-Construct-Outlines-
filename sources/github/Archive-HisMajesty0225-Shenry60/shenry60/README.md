# Shenry60 — Bing-Chat-Project (preserved text source)

Source: `shenry60/Bing-Chat-Project`, public, created 2023-09-09.
2 commits, both 2023-09-09, "Add files via upload".
Repo contents at pull time: `BingChat-main (1).zip` (265,676 bytes, SHA
16ef0d2abb0bcc9700bdba6d0b7432955df1ff0c) + empty `examples` file.

This folder holds the extracted TEXT files from that zip.
Provenance note: the zip README credits upstream `bsdayo/BingChat` /
`b1acksoil/BingChat` — this is a copy of a public open-source .NET
Bing Chat wrapper, not original Shenry60 code. Preserved here so the
Shenry60 account can be closed without losing the copy.

## Zip contents (65 files total)

Text files preserved here (32):
- .github/workflows/nuget.yml (references ${{secrets.NUGET_API_KEY}}, no value)
- .gitignore
- AutomatedDescription/AutomatedDescription.csproj, Program.cs
- AutomatedDescription/Sample outputs/log20230809.txt, log20230817.txt
- BingChat.sln, LICENSE, README.md
- examples/BingChat.Examples/ (csproj, Program.cs, Simple.cs, Streaming.cs, WithConversation.cs)
- src/BingChat/ (csproj, BingChatClient.cs, BingChatClientOptions.cs,
  BingChatConstants.cs, BingChatConversation.cs, BingChatException.cs,
  BingChatRequest.cs, IBingChattable.cs, Model/ChatRequest.cs,
  Model/ChatResponse.cs, SerializerContext.cs, Utils.cs)
- src/dotnet-bingchat/ (csproj, Program.cs, Utils.cs,
  ChatCommandSettings.cs, Commands/AskCommand.cs,
  Commands/ConversationCommand.cs)

Excluded binaries (NOT preserved here, listed for completeness):
- .vs/ Visual Studio cache files (10 files: .dtbcache.v2, .vsidx files,
  .futdcache.v2, .suo, .wsuo, VSWorkspaceState.json)
- AutomatedDescription/*.xlsx (4 files: 2023_09_09 OuputFile.xlsx in two places,
  SampleParts.xlsx in two places)
- AutomatedDescription/Sample outputs/*.xlsx + logs are partly text (logs preserved)
- assets/cli-screenshot.png

Secret scan (2026-10-16): grep for api key / secret / password / token /
bearer / private key found only `CancellationToken` (false positive) and
the `${{secrets.NUGET_API_KEY}}` workflow reference. No real secret values
found in the preserved text files.

## What is still not done

- Exhaustive Estiban log sweep for Shenry60 / migration evidence.
- The original zip binary itself is not stored in this repo.
