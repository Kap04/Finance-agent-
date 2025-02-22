import os


from dotenv import load_dotenv
from textwrap import dedent
from agno.agent import Agent , RunResponse
from agno.models.mistral import MistralChat  
from agno.tools.yfinance import YFinanceTools


load_dotenv()

mistral_api_key = os.getenv("MISTRAL_API_KEY")

print(mistral_api_key)



finance_agent = Agent(
    model=MistralChat(id="mistral-medium", api_key=mistral_api_key),  
    tools=[
        YFinanceTools(
            stock_price=True,
            analyst_recommendations=True,
            stock_fundamentals=True,
            historical_prices=True,
            company_info=True,
            company_news=True,
        )
    ],
    instructions=dedent("""
        You are a seasoned Wall Street analyst with deep expertise in market analysis! 📊 
        
        Follow these steps for comprehensive financial analysis:
        1. Market Overview
           - Latest stock price
           - 52-week high and low
        2. Financial Deep Dive
           - Key metrics (P/E, Market Cap, EPS)
        3. Professional Insights
           - Analyst recommendations breakdown
           - Recent rating changes 
        4. Market Context
           - Industry trends and positioning
           - Competitive analysis
           - Market sentiment indicators
        
        Your reporting style:
        - Begin with an executive summary
        - Use tables for data presentation
        - Include clear section headers
        - Add emoji indicators for trends (📈 📉)
        - Highlight key insights with bullet points
        - Compare metrics to industry averages
        - Include technical term explanations
        - End with a forward-looking analysis
        
        Risk Disclosure:
        - Always highlight potential risk factors
        - Note market uncertainties
        - Mention relevant regulatory concerns
    """),
    add_datetime_to_instructions=True,
    show_tool_calls=True,
    markdown=True,
)

def get_financial_analysis():
    while True:
        print("\nEnter your financial analysis query (or 'quit' to exit):")
        user_query = input("> ")
        
        if user_query.lower() == 'quit':
            break
            
        finance_agent.print_response(user_query, stream=True)

if __name__ == "__main__":
    print("Welcome to the Financial Analysis Tool!")
    print("You can ask about stocks, market analysis, or industry comparisons.")
    print("Example: 'What's the latest news and financial performance of Apple (AAPL)?'")
    get_financial_analysis()

# # Example usage with detailed market analysis request
# finance_agent.print_response(
#     "What's the latest news and financial performance of Apple (AAPL)?", stream=True
# )

# # Semiconductor market analysis example
# finance_agent.print_response(
#     dedent("""\
#     Analyze the semiconductor market performance focusing on:
#     - NVIDIA (NVDA)
#     - AMD (AMD)
#     - Intel (INTC)
#     - Taiwan Semiconductor (TSM)
#     Compare their market positions, growth metrics, and future outlook."""),
#     stream=True,
# )

# # Automotive market analysis example
# finance_agent.print_response(
#     dedent("""\
#     Evaluate the automotive industry's current state:
#     - Tesla (TSLA)
#     - Ford (F)
#     - General Motors (GM)
#     - Toyota (TM)
#     Include EV transition progress and traditional auto metrics."""),
#     stream=True,
# )

# # More example prompts to explore:
# """
# Advanced analysis queries:
# 1. "Compare Tesla's valuation metrics with traditional automakers"
# 2. "Analyze the impact of recent product launches on AMD's stock performance"
# 3. "How do Meta's financial metrics compare to its social media peers?"
# 4. "Evaluate Netflix's subscriber growth impact on financial metrics"
# 5. "Break down Amazon's revenue streams and segment performance"

# Industry-specific analyses:
# Semiconductor Market:
# 1. "How is the chip shortage affecting TSMC's market position?"
# 2. "Compare NVIDIA's AI chip revenue growth with competitors"
# 3. "Analyze Intel's foundry strategy impact on stock performance"
# 4. "Evaluate semiconductor equipment makers like ASML and Applied Materials"

# Automotive Industry:
# 1. "Compare EV manufacturers' production metrics and margins"
# 2. "Analyze traditional automakers' EV transition progress"
# 3. "How are rising interest rates impacting auto sales and stock performance?"
# 4. "Compare Tesla's profitability metrics with traditional auto manufacturers"
# """

