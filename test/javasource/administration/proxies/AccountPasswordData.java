// This file was generated by Mendix Business Modeler 4.0.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package administration.proxies;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;

/**
 * 
 */
public class AccountPasswordData
{
	private final IMendixObject accountPasswordDataMendixObject;

	private final IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final String entityName = "Administration.AccountPasswordData";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		OldPassword("OldPassword"),
		NewPassword("NewPassword"),
		ConfirmPassword("ConfirmPassword"),
		AccountPasswordData_Account("Administration.AccountPasswordData_Account");

		private String metaName;

		MemberNames(String s)
		{
			metaName = s;
		}

		@Override
		public String toString()
		{
			return metaName;
		}
	}

	public AccountPasswordData(IContext context)
	{
		this(context, Core.instantiate(context, "Administration.AccountPasswordData"));
	}

	protected AccountPasswordData(IContext context, IMendixObject accountPasswordDataMendixObject)
	{
		if (accountPasswordDataMendixObject == null)
			throw new IllegalArgumentException("The given object cannot be null.");
		if (!Core.isSubClassOf("Administration.AccountPasswordData", accountPasswordDataMendixObject.getType()))
			throw new IllegalArgumentException("The given object is not a Administration.AccountPasswordData");

		this.accountPasswordDataMendixObject = accountPasswordDataMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'new AccountPasswordData(Context)' instead. Note that the constructor will not insert the new object in the database.
	 */
	@Deprecated
	public static administration.proxies.AccountPasswordData create(IContext context) throws CoreException
	{
		IMendixObject mendixObject = Core.create(context, "Administration.AccountPasswordData");
		return new administration.proxies.AccountPasswordData(context, mendixObject);
	}

	/**
	 * @deprecated Use 'AccountPasswordData.load(IContext, IMendixIdentifier)' instead.
	 */
	@Deprecated
	public static administration.proxies.AccountPasswordData initialize(IContext context, IMendixIdentifier mendixIdentifier) throws CoreException
	{
		return administration.proxies.AccountPasswordData.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.getSudoContext() can be used to obtain sudo access).
	 */
	public static administration.proxies.AccountPasswordData initialize(IContext context, IMendixObject mendixObject)
	{
		return new administration.proxies.AccountPasswordData(context, mendixObject);
	}

	public static administration.proxies.AccountPasswordData load(IContext context, IMendixIdentifier mendixIdentifier) throws CoreException
	{
		IMendixObject mendixObject = Core.retrieveId(context, mendixIdentifier);
		return administration.proxies.AccountPasswordData.initialize(context, mendixObject);
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws CoreException
	{
		Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(IContext context) throws CoreException
	{
		Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(IContext context)
	{
		Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of OldPassword
	 */
	public final String getOldPassword()
	{
		return getOldPassword(getContext());
	}

	/**
	 * @param context
	 * @return value of OldPassword
	 */
	public final String getOldPassword(IContext context)
	{
		return (String) getMendixObject().getValue(context, MemberNames.OldPassword.toString());
	}

	/**
	 * Set value of OldPassword
	 * @param oldpassword
	 */
	public final void setOldPassword(String oldpassword)
	{
		setOldPassword(getContext(), oldpassword);
	}

	/**
	 * Set value of OldPassword
	 * @param context
	 * @param oldpassword
	 */
	public final void setOldPassword(IContext context, String oldpassword)
	{
		getMendixObject().setValue(context, MemberNames.OldPassword.toString(), oldpassword);
	}

	/**
	 * @return value of NewPassword
	 */
	public final String getNewPassword()
	{
		return getNewPassword(getContext());
	}

	/**
	 * @param context
	 * @return value of NewPassword
	 */
	public final String getNewPassword(IContext context)
	{
		return (String) getMendixObject().getValue(context, MemberNames.NewPassword.toString());
	}

	/**
	 * Set value of NewPassword
	 * @param newpassword
	 */
	public final void setNewPassword(String newpassword)
	{
		setNewPassword(getContext(), newpassword);
	}

	/**
	 * Set value of NewPassword
	 * @param context
	 * @param newpassword
	 */
	public final void setNewPassword(IContext context, String newpassword)
	{
		getMendixObject().setValue(context, MemberNames.NewPassword.toString(), newpassword);
	}

	/**
	 * @return value of ConfirmPassword
	 */
	public final String getConfirmPassword()
	{
		return getConfirmPassword(getContext());
	}

	/**
	 * @param context
	 * @return value of ConfirmPassword
	 */
	public final String getConfirmPassword(IContext context)
	{
		return (String) getMendixObject().getValue(context, MemberNames.ConfirmPassword.toString());
	}

	/**
	 * Set value of ConfirmPassword
	 * @param confirmpassword
	 */
	public final void setConfirmPassword(String confirmpassword)
	{
		setConfirmPassword(getContext(), confirmpassword);
	}

	/**
	 * Set value of ConfirmPassword
	 * @param context
	 * @param confirmpassword
	 */
	public final void setConfirmPassword(IContext context, String confirmpassword)
	{
		getMendixObject().setValue(context, MemberNames.ConfirmPassword.toString(), confirmpassword);
	}

	/**
	 * @return value of AccountPasswordData_Account
	 */
	public final administration.proxies.Account getAccountPasswordData_Account() throws CoreException
	{
		return getAccountPasswordData_Account(getContext());
	}

	/**
	 * @param context
	 * @return value of AccountPasswordData_Account
	 */
	public final administration.proxies.Account getAccountPasswordData_Account(IContext context) throws CoreException
	{
		administration.proxies.Account result = null;
		IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.AccountPasswordData_Account.toString());
		if (identifier != null)
			result = administration.proxies.Account.load(context, identifier);
		return result;
	}

	/**
	 * Set value of AccountPasswordData_Account
	 * @param accountpassworddata_account
	 */
	public final void setAccountPasswordData_Account(administration.proxies.Account accountpassworddata_account)
	{
		setAccountPasswordData_Account(getContext(), accountpassworddata_account);
	}

	/**
	 * Set value of AccountPasswordData_Account
	 * @param context
	 * @param accountpassworddata_account
	 */
	public final void setAccountPasswordData_Account(IContext context, administration.proxies.Account accountpassworddata_account)
	{
		if (accountpassworddata_account == null)
			getMendixObject().setValue(context, MemberNames.AccountPasswordData_Account.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.AccountPasswordData_Account.toString(), accountpassworddata_account.getMendixObject().getId());
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final IMendixObject getMendixObject()
	{
		return accountPasswordDataMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final IContext getContext()
	{
		return context;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final administration.proxies.AccountPasswordData that = (administration.proxies.AccountPasswordData) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static String getType()
	{
		return "Administration.AccountPasswordData";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@Deprecated
	public String getGUID()
	{
		return "ID_" + getMendixObject().getId().getGuid();
	}
}
