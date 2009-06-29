describe("ti.App tests",
{
	validate_app: function()
	{
		value_of(Titanium.platform).should_be_one_of(['win32','osx','linux']);
		value_of(Titanium.version).should_be_string();
		
		value_of(Titanium.App.getID()).should_be('com.titaniumapp.unittest');
		value_of(Titanium.App.getName()).should_be('foobar');
		value_of(Titanium.App.getVersion()).should_be('1.2');
		value_of(Titanium.App.getPublisher()).should_be('yoy');
		value_of(Titanium.App.getURL()).should_be('blah.com');
		value_of(Titanium.App.getCopyright()).should_be('2010');
		value_of(Titanium.App.getDescription()).should_be('cool like dat');
		value_of(Titanium.App.getGUID()).should_be('CF0D2CB7-B4BD-488F-9F8E-669E6B53E0C4');

		value_of(Titanium.App.exit).should_be_function();
		value_of(Titanium.App.loadProperties).should_be_function();
		value_of(Titanium.App.path).should_not_be_null();
		value_of(Titanium.App.arguments).should_not_be_null();
		value_of(Titanium.App.Properties).should_be_object();
		
		value_of(Titanium.App.home).should_not_be_null();
		value_of(Titanium.App.Properties.getString("ti.app.home")).should_be(Titanium.App.home);
		
		// this is specific to the test harness args
		value_of(Titanium.App.arguments.length).should_be(6); 
		
		value_of(Titanium.App.stdout).should_be_function();
		value_of(Titanium.App.stderr).should_be_function();
		
		// this should be the default stream if not specified in the manifest
		value_of(Titanium.App.getStreamURL()).should_be('https://api.appcelerator.net/p/v1');
		// test passing arg
		value_of(Titanium.App.getStreamURL('foo')).should_be('https://api.appcelerator.net/p/v1/foo');
		// test passing multiple args
		value_of(Titanium.App.getStreamURL('foo','bar')).should_be('https://api.appcelerator.net/p/v1/foo/bar');
	},
	//comment out for now, this test function causes the app test to timeout in win32,
	test_system_properties: function()
	{
		// test type conversion and parsing of system properties embedded in tiapp.xml
		value_of(Titanium.App.getSystemProperties()).should_be_object();
		var sysProps = Titanium.App.getSystemProperties();
		
		value_of(sysProps.getString("teststring")).should_be("stringvalue");
		value_of(sysProps.getInt("testint")).should_be(1);
		value_of(sysProps.getDouble("testdouble")).should_be(1.23);
		value_of(sysProps.getString("testdefaultstring")).should_be("stringvalue");
		value_of(sysProps.getInt("badint")).should_be(0);
		value_of(sysProps.getDouble("baddouble")).should_be(0);
	},
	
	test_create_properties: function()
	{
		var props = Titanium.App.createProperties();
		value_of(props.getBool).should_be_function();
		value_of(props.getInt).should_be_function();
		value_of(props.getList).should_be_function();
		value_of(props.getDouble).should_be_function();
		value_of(props.setString).should_be_function();
		
		value_of(props.setBool).should_be_function();
		value_of(props.setInt).should_be_function();
		value_of(props.setList).should_be_function();
		value_of(props.setDouble).should_be_function();
		value_of(props.setString).should_be_function();
		value_of(props.hasProperty).should_be_function();
		value_of(props.listProperties).should_be_function();
		value_of(props.saveTo).should_be_function();
		
		var props2 = Titanium.App.createProperties({
			"val1": true,
			"val2": 1.1,
			"val3": ['a', 'b', 'c'],
			"val4": "123"
		});
		
		value_of(props2).should_be_object();
		
		value_of(props2.listProperties()).should_match_array(["val1","val2","val3","val4"]);
		value_of(props2.getBool("val1")).should_be_true();
		value_of(props2.getDouble("val2")).should_be(1.1);
		
		var val3 = props2.getList("val3");
		value_of(val3).should_not_be_null();
		value_of(val3).should_be_array();
		
		value_of(props2.getList("val3")).should_match_array(['a','b','c']);
		value_of(props2.getString("val4")).should_be("123");
		
		var TFS = Titanium.Filesystem;
		var sep = TFS.getSeparator();
		var appdir = TFS.getApplicationDataDirectory();
		var path = appdir+sep+"_testing.properties";
		
		props2.saveTo(path);
		value_of(TFS.getFile(path).exists()).should_be_true();
	},
	
	test_app_properties: function ()
	{
		var props = Titanium.App.loadProperties(Titanium.App.appURLToPath("app://app.properties"));
		value_of(props).should_be_object();
		value_of(props.getBool("trueval")).should_be_true();
		value_of(props.getBool("falseval")).should_be_false();
		value_of(props.getInt("numval")).should_be(1);
		value_of(props.getString("stringval")).should_be("hey this is just a string");
		value_of(props.getDouble("doubleval")).should_be(1.1);
		value_of(props.getList("listval")).should_match_array(["entry1","entry2","entry3"]);
	}
});