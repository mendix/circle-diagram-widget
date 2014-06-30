// This file was generated by Mendix Business Modeler 4.0.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package system.proxies;

public enum UserLimitationType
{
	Named(new String[][] { new String[] { "en_US", "Named" }, new String[] { "nl_NL", "Benoemd" } }),
	Concurrent(new String[][] { new String[] { "en_US", "Concurrent" }, new String[] { "nl_NL", "Gelijktijdig" } }),
	ConcurrentAnonymous(new String[][] { new String[] { "en_US", "Concurrent anonymous" }, new String[] { "nl_NL", "Gelijktijdig anoniem" } });

	private java.util.Map<String,String> captions;

	private UserLimitationType(String[][] captionStrings)
	{
		this.captions = new java.util.HashMap<String,String>();
		for (String[] captionString : captionStrings)
			captions.put(captionString[0], captionString[1]);
	}

	public String getCaption(String languageCode)
	{
		if (captions.containsKey(languageCode))
			return captions.get(languageCode);
		return captions.get("en_US");
	}

	public String getCaption()
	{
		return captions.get("en_US");
	}
}
