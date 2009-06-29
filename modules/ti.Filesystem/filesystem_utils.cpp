/**
 * Appcelerator Titanium - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license.
 * Copyright (c) 2009 Appcelerator, Inc. All Rights Reserved.
 */
#include "filesystem_utils.h"

#include <Poco/File.h>
#include <Poco/Path.h>
#include <Poco/FileStream.h>
#include <Poco/Exception.h>

namespace ti
{
	FileSystemUtils::FileSystemUtils() { }
	FileSystemUtils::~FileSystemUtils() { }
	
	/*static*/
	SharedString FileSystemUtils::GetFileName(SharedValue v)
	{
		if (v->IsString())
		{
			return new std::string(v->ToString());
		}
		else if (v->IsObject())
		{
			return v->ToObject()->DisplayString();
		}
		else
		{
			std::string message = "can't convert object of type ";
			message += v->ToTypeString();
			message += " to filename: don't know what to do";
			throw ValueException::FromString(message);
		}
	}
	
	/*static*/
	SharedPtr<File> FileSystemUtils::ToFile(SharedKObject object)
	{
		SharedPtr<File> file = object.cast<File>();
		if (file.isNull())
		{
			SharedPtr<ProfiledBoundObject> pFile = object.cast<ProfiledBoundObject>();
			if (pFile.isNull()) {
				throw ValueException::FromString("invalid object type, don't know how to cast to file");
			}
			
			file = pFile->GetDelegate().cast<File>();
			if (file.isNull()) {
				throw ValueException::FromString("invalid object type, don't know how to cast to file");
			}
		}
		return file;
	}
}