using NATS.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    class Program
    {
        static string url = "nats://88.214.236.159:5555/";
        static string feedZakupki = "Zakupki";
        static void Main(string[] args2)
        {
            Run();
            Console.ReadKey();
        }
        static EventHandler<MsgHandlerEventArgs> msgHandler = async (sender, args) =>
        {
            Console.WriteLine("Received: " + args.Message);
            var nats = new NatsServer(url, feedZakupki, null);
            var json = await Parser.ParseKTRU(Encoding.UTF8.GetString(args.Message.Data));
            nats.RunPublisher(json);
        };
       
        static async void Run()
        {         

            var server = new NatsServer(url, feedZakupki, msgHandler);

           
        }
    }
}
