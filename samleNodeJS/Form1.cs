using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace samleNodeJS
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public void start()
        {
            try
            {
                //var edge = require("edge");
                //var hello = edge.func('async (input) => { return ".NET welcomes " + input.ToString(); }');
                //hello('Node.js', function (error, result) {
                //    if (error) throw error;
                //    console.log(result);
                //});
            //    var edge = require("edge");
            //                var hello = edge.func(function () {
            //    async (input) => { 
            //        return ".NET welcomes " + input.ToString(); 
            //    },
            //});

            //    hello('Node.js', function (error, result) {
            //        if (error) throw error;
            //        console.log(result);
            //    });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
