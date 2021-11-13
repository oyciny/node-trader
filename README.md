## Node Trader
Node Trader is a tool for making trades on the stock market.

## Quick Start Guide
To get started with Node Trader follow the steps below.

### Installation
To install Node Trader you have to have [Node.js](https://nodejs.org) installed.
Once Node has been installed simply run the following command in your terminal:  
```console
> npm i --global node-trader
```  
Once you have installed both Node.js and Node Trader you are ready to get Started

### Login
Now that you have Node Trader installed you can save your login credentials using the  
following command:  

**For Robinhood**  
```console
> node-trader service -l robinhood
```  
**For Webull**  
```console
> node-trader service -l webull
```  
Feel free to link more than one service.

### Usage
Using node-trader is pretty straight forward. Buy and Sell commands are done like so:  
```console
> node-trader buy -s robinhood AAPL 10
```  
This will initiate a buy order on your robinhood account for 10 shares of the AAPL  
ticker symbol. If you prefer to buy in dollar amounts just pass the dollar flag like so:  
```console
> node-trader buy -s robinhood AAPL -d 10
```

### Managing Credentials
Credentials are managed with the service command. To add credentails use:  

**Robinhood**
```console
> node-trader service -l robinhood
```  
**Webull**
```console
> node-trader service -l webull
```  
*Note: You can only save one set of credentials for each service*  

To remove credentials use:  

**Robinhood**
```console
> node-trader service -r robinhood
```  
**Webull**
```console
> node-trader service -r webull
```  
To see your credentails use:  

**Robinhood**
```console
> node-trader service robinhood
```  
**Webull**
```console
> node-trader service -l webull
```

### More help
If you ever need more help just use the help command!  
```console
> node-trader -h
```