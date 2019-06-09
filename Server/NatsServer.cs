using NATS.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Server
{
    class NatsServer
    {
        Options opts = ConnectionFactory.GetDefaultOptions();
        string url;
        EventHandler<MsgHandlerEventArgs> msgHandler;
        string channel;
        public NatsServer(string url, string channel, EventHandler<MsgHandlerEventArgs> msgHandler)
        {
            this.url = url;
            this.msgHandler = msgHandler;
            this.channel = channel;
            opts.Url = url;
            if (msgHandler != null)
                ThreadPool.QueueUserWorkItem((stateInfo) => RunSubscribe());
        }

        public async Task ReceiveAsyncSubscribe(IConnection c, string subject)
        {
            object testLock = new object();

            using (IAsyncSubscription s = c.SubscribeAsync(subject, msgHandler))
            {
                //just wait until we are done.
                await Task.Delay(TimeSpan.FromMilliseconds(-1));
            }
        }

        void RunSubscribe()
        {            
            using (IConnection c = new ConnectionFactory().CreateConnection(opts))
            {
                Console.WriteLine($"Subscribe Run on server:{url} feed:{channel}");
                var elapsed = ReceiveAsyncSubscribe(c, channel);
            }
        }

        public void RunPublisher(string json) => ThreadPool.QueueUserWorkItem((stateInfo) => Publisher(json));
        void Publisher(string json)
        {
            var payload = Encoding.UTF8.GetBytes(json);

            using (IConnection c = new ConnectionFactory().CreateConnection(opts))
            {
                    System.Console.WriteLine("Sending requests on subject {0}",channel);
                    System.Console.WriteLine("  Url: {0}", opts.Url);
                    System.Console.WriteLine("  Payload is {0} bytes.",payload != null ? payload.Length : 0);
                    var msg = c.Request(channel, payload);
                    c.Flush();  
            }
        }
    }
}
