package org.gl.ceir.CeirPannelCode.Util;

import org.apache.commons.lang3.RandomStringUtils;

public class NonceUtils {

	public static String generateNonce(int length) {
        return RandomStringUtils.random(length, true, true);
    }
	
}
