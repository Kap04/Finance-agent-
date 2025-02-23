import os


from dotenv import load_dotenv
from textwrap import dedent
from agno.agent import Agent 
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
            
        finance_agent.run(user_query, stream=True)

if __name__ == "__main__":
    print("Welcome to the Financial Analysis Tool!")
    print("You can ask about stocks, market analysis, or industry comparisons.")
    print("Example: 'What's the latest news and financial performance of Apple (AAPL)?'")
    get_financial_analysis()

